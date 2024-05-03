const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/views/homepage.html');
});

app.get('/typing', (req, res) => {
 res.sendFile(__dirname + '/views/typing.html');
});

app.get('/StratagemHero', (req, res) => {
    res.sendFile(__dirname + '/views/StratagemHero.html');
});

app.get('/AimTrainer', (req, res) => {
    res.sendFile(__dirname + '/views/AimTrainer.html');
});

app.get('/SimonSays', (req, res) => {
    res.sendFile(__dirname + '/views/SimonSays.html');
});

app.get('/Profile', (req, res) => {
    res.sendFile(__dirname + '/views/Profile.html');
});

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});