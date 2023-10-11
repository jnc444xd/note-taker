const express = require('express');
const path = require('path');
const api = require('./routes/index');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
});

// Why can't index.html be inside pages?
app.get('*', (req, res) => {
    res.sendFile(__dirname, '/public/index.html')
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});