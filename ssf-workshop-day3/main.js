//Load libs
const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const asciify = require('asciify-image');

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

//Configure handlebars
app.engine('hbs', hbs());
app.set('view engine', 'hbs');
app.set('views', 'views');

//Define our routes
// GET /image -> text/html
app.get('/image', (req, resp) => {
    const imageFile = randImage(images);

    resp.status(200);
    resp.format({
        'text/html': () => {
            resp.render('image', { image: imageFile });
            //resp.send(`<img src='/${imageFile}'>`);
        },
        'application/json': () => {
            resp.json({ imageURL: `/${imageFile}`})
        },
        'image/png': () => {
            resp.sendFile(path.join(__dirname, 'images', imageFile));
        },
        'text/html': () => {
            const opt = {
                fit: 'box', color: true,
                width: 50, height: 50
            }
            asciify(path.join(__dirname, 'images', imageFile), opt,
                (err, ascii) => {
                    if (err) {
                        resp.status(400).send(JSON.stringify(err));
                        return;
                    }
                    resp.send(ascii);
                    console.info(ascii);
                }
            )
        },
        'default': () => {
            resp.status(406).end();
        }
    })
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