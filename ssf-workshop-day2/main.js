//Load libs
const path = require('path');
const express = require('express');

const resources = [ 'images', 'public' ];
const images = [ 'mushroom.png', 'onion.png', 'potato.png',
    'pumpkin.png', 'radish.png', 'squash.png' ]

const randImage = (array) => {
    const rand = Math.random();
    const index = Math.floor(rand * array.length)
    return (array[index]);
}

//Create an instance of Express
const app = express();

//Define our routes
// GET /image -> text/html
app.get('/image', (req, resp) => {
    resp.status(200);
    resp.type('text/html');
    resp.send(`<img src='/${randImage(images)}'>`);
});

//GET /random-image -> image/png
app.get('/random-image', (req, resp) => {
    const imageFile = randImage(images);
    resp.status(200);
    resp.type('image/png');
    resp.sendfile(path.join(__dirname, 'images', imageFile));
});

for (let res of resources) {
    console.info(`Adding ${res} to static`)
    app.use(express.static(path.join(__dirname, res)));
}

//Start the Express application
const PORT = parseInt(process.argv[2]) || 
        parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT}`);
});