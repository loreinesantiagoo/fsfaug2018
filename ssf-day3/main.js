//load libs
const path = require('path');
const hbs = require('express-handlebars');
const request = require('request');
const querystring = require('querystring');
const express = require('express');

//Create an instance of express
const app = express();

//Configure express to use handlebars as the rendering engine
app.engine('hbs', hbs());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'my-views'));

//Create routes
app.get('/rates', (req, resp) => {

    request.get('http://data.fixer.io/api/latest', 
        { qs: { access_key: '__YOUR_API_KEY__' } },
        (err, response, body) => {
            if (err) {
                resp.status(400);
                resp.type('text/plain');
                resp.send(err);
                return;
            }

            //Parse the JSON string to JSON
            const result = JSON.parse(body);
            const rates = result.rates;
            const rateArray = []
            for (let c of Object.keys(rates)) 
                rateArray.push({ currency: c, rate: rates[c] });

            resp.status(200);
            resp.render('rates', { 
                baseRate: result.base,
                date: result.date,
                rates: rateArray, 
                layout: false 
            });
        }
    )

});

app.get('/httpbin', (req, resp) => {
    const param = {
        name: 'fred &&& flintstone',
        email: 'fred@gmail.com'
    };
    //console.info('params = ' + querystring.stringify(param));
    //request.get('https://httpbin.org/get?' + querystring.stringify(param),
    request.get('https://httpbin.org/get?', { 
            qs: {
                name: 'barney',
                email: 'barney@gmail.com'
            } 
        },
        (err, result, body) => {
            if (err) {
                resp.status(400);
                resp.type('text/plain');
                resp.send(JSON.stringify(err));
                return;
            }
            console.info('>>> body: ', body);
            resp.status(200);
            resp.json(JSON.parse(body));
        }
    )
});

app.get('/time', (req, resp) => {
    console.info(`Accept: ${req.get('Accept')}`);

    resp.status(200);

    resp.format({
        'text/html': () => {
            resp.render('time', { 
                time: (new Date()).toString(), 
                someThoughts: '<h4>Lorem Ipsun</h4><script>alert("hello");</script>',
                layout: false 
            })
            //resp.send(`<h1>The current time is ${new Date()}</h1>`);
        },
        'application/json': () => {
            resp.json({ time: new Date() })
        },
        'text/plain': () => {
            const data = { time: new Date() };
            resp.send(`This is JSON as string: ${JSON.stringify(data)}`)
        },
        'default': () => {
            resp.status(406);
            resp.end()
        }
    })
});

//Start express
const PORT = parseInt(process.argv[2])
        || parseInt(process.env.APP_PORT) || 3000
app.listen(PORT, () => {
    console.info(`Application started on ${PORT} at ${new Date()}`);
});