const notes = require('express').Router();
const fs = require('fs');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuidv4(),
    }

    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'Success',
        body: newNote
    };

    res.json(response);
});

notes.delete('/:id', (req, res) => {
    const checkID = req.params.id;
    let deletedData = "";

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);

            const filterInput = (input) => {
                return input.filter((item) => item.id !== checkID)
            };

            const filteredData = filterInput(parsedData);

            const findCheckID = (input) => {
                return input.filter((item) => item.id === checkID)
            };

            deletedData = findCheckID(parsedData);

            writeToFile('./db/db.json', filteredData);

            const response = {
                status: 'Success',
                body: deletedData
            };

            res.json(response);
        };
    });
});

module.exports = notes;