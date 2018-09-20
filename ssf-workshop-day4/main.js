//Load libs
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

//Fake database
const db = {};

//Create an instance of express
const app = express();

//Create route

//GET /api/cart?name=fred
app.get('/api/cart', (req, resp) => {

    const name = req.query.name;

    if (!name) {
        resp.status(400).json({ error: 'Missing name' });
        return;
    }

    resp.status(200);
    if (name in db) {
        resp.json(db[name]);
        return;
    }

    resp.json({
        name: name, content: [], saved: ''
    });
});

//POST /api/post
app.post('/api/cart',
    bodyParser.json(),
    (req, resp) => {
        const cart = req.body;

        if ((!('content' in cart)) || cart.content.length <= 0) {
            resp.status(409).json({ error: 'Cart content is invalid '});
            return;
        }

        db[cart.name] = {
            ...cart, //spread operator, doing the 2 lines below
            //name: cart.name,
            //content: cart.content,
            saved: (new Date()).toString()
        }

        console.info('saved: ', db[cart.name]);
        resp.status(201).json(db[cart.name]);
    }
);

//Serve static resources
app.use(express.static(path.join(__dirname, 'public')));

//Start server
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
app.listen(PORT, () => {
    console.info(`Application running on port ${PORT}`);
})