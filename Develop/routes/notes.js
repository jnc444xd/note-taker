const notes = require('express').Router();
// Why don't I need to create instance of express here like in index file?
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

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

    console.log(response);
    res.json(response);
});

notes.delete('/:id', (req, res) => {
    const checkID = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);

            const filterInput = (input) => {
                return input.filter((item) => item.id !== checkID)
            };

            const filteredData = filterInput(parsedData);

            writeToFile('./db/db.json', filteredData);
        };
    })
});

module.exports = notes;