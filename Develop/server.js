const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8080;
jsonNotes = require('./db/db.json')

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('./'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(jsonNotes);
});

app.post('/api/notes', (req, res) => {

    const prevID = jsonNotes.length ? Math.max(...(jsonNotes.map(note => note.id))) : 0;
    const id = prevID + 1;
    jsonNotes.push( { id, ...req.body});
    res.json(jsonNotes.slice(-1));
});

app.delete('/api/notes/:id', (req, res) => {
    // console.log(res);
    let id = parseInt(req.params.id);
    let note = jsonNotes.find( ({ id }) => id === JSON.parse(req.params.id));

    jsonNotes.splice( jsonNotes.indexOf(note), 1);
    res.end("Note has been removed");
});

app.listen(PORT, () => console.log(`APP listening on port ${PORT}`));


