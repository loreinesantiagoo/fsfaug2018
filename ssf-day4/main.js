//Load libraries
const path = require('path');
const uuidV1 = require('uuid/v1');
const uuidV5 = require('uuid/v5');
const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('express-handlebars');

//Create an instance of Express
const app = express();

//Configure handlebars
app.engine('html', hbs({ defaultLayout: 'main.html'}))
app.set('view engine', 'html');

//Create routes

//GET /uuid
app.get('/uuid', (req, resp) => {
    const uuid = uuidV1();

    resp.set('Cache-Control', 'no-cache');

    resp.format({
        'text/html': () => {
            resp.render('online_uuid', { uuidText: uuid });
            //resp.send(`<h3><code>${uuid}</code></h3>`);
        },
        'application/json': () => {
            resp.json({
                uuid: uuid,
                generated_on: (new Date()).toString()
            })
        },
        'text/plain': () => {
            resp.send(uuid);
        },
        'default': () => {
            resp.status(406).end();
        }
    });
});

app.get('/uuids', (req, resp) => {

    const count = parseInt(req.query.uuidCount) || 1;
    const uuidList = [];

    const text = '<h4>This is another body</h4>'

    for (let i = 0; i < count; i++)
        uuidList.push(uuidV1());

    resp.status(200);
    resp.type('text/html');
    //resp.render('list_of_uuids', { uuidList: uuidList, layout: 'abc.html' });
    //resp.render('list_of_uuids', { uuidList: uuidList, anotherBody: text });
    resp.render('list_of_uuids', { uuidList: uuidList, version: 'V1' });
});

//Parse json and form-urlencodede payload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.post('/gen-passwd', (req, resp) => {
    const name = req.body.name;

    const passwd = uuidV5(name, '1b671a64-40d5-491e-99b0-da01ff1f3341')
            .replace(/-/g, '')
            .substring(16);

    resp.status(200).type('text/plain').send(passwd);
})

app.post('/uuidV5', 
    bodyParser.json(), bodyParser.urlencoded(),
    (req, resp) => {
        console.log('after req.body = ', req.body);
        const ns = req.body.namespace;
        const count = parseInt(req.body.uuidCount) || 2;
        const uuidList = [];
        for (var i = 0; i < count; i++)
            uuidList.push(uuidV5(ns, uuidV5.DNS));
        resp.status(200);
        resp.format({
            'text/html': () => {
                resp.render('list_of_uuids', { uuidList: uuidList, version: 'V5' });
            },
            'text/csv': () => {
                resp.send(uuidList.join(','));
            }

        })
    }
);

//Serve static resources
app.use(express.static(path.join(__dirname, 'public')));

//Start the server
const PORT = parseInt(process.argv[2]) ||
        parseInt(process.env.APP_PORT) || 3000
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT}`);
});