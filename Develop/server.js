const express = require('express');
const api = require('./routes/index.js');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
});

app.get('*', (req,res) => {
    res.sendFile(__dirname, '/public/pages/index.html')
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});