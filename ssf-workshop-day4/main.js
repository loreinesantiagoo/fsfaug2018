//Load libs
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const express = require('express');

//Fake database
const db = {
    'fred': {
        name: 'fred',
        content: ['apple', 'orange', 'pear'],
        saved: (new Date()).toString()
    }
};

//Create an instance of express
const app = express();

//configure handlebars
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

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
        resp.format({
            'application/json': () => {
                resp.json(db[name]);
            },
            'text/html': () => {
                resp.render('form', {
                    layout: false,
                    hiddenContent: JSON.stringify(db[name].content),
                    ...db[name]
                })
            }
        })
        return;
    }

    resp.format({
        'application/json': () => {
            resp.json({
                name: name, content: [], saved: ''
            });
        },
        'text/html': () => {
            resp.render('form', { 
                layout: false,
                name: name,
                content: [],
                hiddenConent: '[]'
            })
        }
    })

});

//POST /api/post
app.post('/api/cart',
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    (req, resp) => {
        let cart;

        if (req.is('application/json')) {
            // { name: 'fred', content: ['apple']}
            cart = req.body;
            if ((!('content' in cart)) || cart.content.length <= 0) {
                resp.status(409).json({ error: 'Cart content is invalid '});
                return;
            }
        } else if (req.is('application/x-www-form-urlencoded')) {
            cart = {
                name: req.body.name,
                content: JSON.parse(req.body.cart)
            }
            cart.content.push(req.body.item);
            console.log('from from: ', cart);
        } else {
            //TODO return error
            resp.status(400).json({ });
            return;
        }

        db[cart.name] = {
            ...cart, //spread operator, doing the 2 lines below
            //name: cart.name,
            //content: cart.content,
            saved: (new Date()).toString()
        }

        resp.format({
            'text/html': () => {
                resp.status(201)
                resp.render('form', {
                    layout: false,
                    hiddenContent: JSON.stringify(cart.content),
                    ...db[cart.name],
                });
            },
            'application/json': () => {
                resp.status(201).json(db[cart.name]);
            }
        });
    }
);

// POST /api/add
app.post('/api/add', 
    bodyParser.urlencoded({extended: true}),
    (req, resp) => {
        //TODO: check for errors
        const name = req.body.name;
        //Retrieve the 'record' from 'database'
        const savedData = name in db? db[name]: { name: name, content: [], saved: '' }
        //update record
        savedData.content.push(req.body.item)
        //Write the data back to database
        db[name] = savedData;

        resp.status(200).type('text/html');
        resp.render('form', {
            layout: false,
            ...savedData
        });
    }
)

//Load the form
app.get('/form', (req, resp) => {
    resp.status(200).type('text/html');
    resp.render('form', { layout: false });
})

//Serve static resources
app.use(express.static(path.join(__dirname, 'public')));

//Start server
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
app.listen(PORT, () => {
    console.info(`Application running on port ${PORT}`);
})