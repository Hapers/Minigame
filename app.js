const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;



app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/homepage.html');
});

app.get('/typing', (req, res) => {
 res.sendFile(__dirname + '/views/typing.html');
});

app.get('/stratagem-hero', (req, res) => {
    res.sendFile(__dirname + '/views/StratagemHero.html');
});

app.get('/aim-trainer', (req, res) => {
    res.sendFile(__dirname + '/views/AimTrainer.html');
});

app.get('/simon-says', (req, res) => {
    res.sendFile(__dirname + '/views/SimonSays.html');
});

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/views/Profile.html');
});

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});

app.get('/get-sentence', (req, res) => {
    let index = Math.floor(Math.random() * 100);
    res.send({sentence: fs.readFileSync('public/docs/texts.txt', 'utf8').split('\n')[index]});
})