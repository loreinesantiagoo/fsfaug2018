//Load libs
const path = require('path');
const express = require('express');

//Create an instance of express app
const app = express();

console.log('>>> ', express.static(path.join(__dirname, 'public')));

//Define routes
// Log every request that comes in
app.use((req, resp, next) => {
    console.log(`**** ${new Date()} ${req.method}, ${req.originalUrl}`);
    next();
})

const checkAuth = (req, resp, next) => {
    console.log('Perform authentication ' + new Date());
    next();
}

// GET /time -> HTTP
app.get('/time', checkAuth,
    (req, resp) => {
        //status
        resp.status(201);
        resp.type('text/plain')
        resp.send(`<h1>The current time is ${new Date()}</h1>`);
    }
);

// GET /time/json
app.get('/time/json', (req, resp) => {
    const data = { name: 'Fred', email: 'fred@gmail.com' }
    resp.status(200);
    resp.type('application/json'); //media type
    resp.json({
        time: new Date(),
        people: data
    });
});

// GET / -> HTTP
/*
app.get('/', (req, resp) => {
    const userAgent = req.get('User-Agent');
    resp.status(200);
    resp.type('text/html')
    resp.send(`<h1>Hello ${userAgent}</h1>`);
});
*/

app.use('/images', checkAuth, express.static(path.join(__dirname, 'assets')));

app.use(express.static(path.join(__dirname, 'public')));

//Start server
const PORT = parseInt(process.argv[2]) ||
        parseInt(process.env.APP_PORT) || 3000
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});