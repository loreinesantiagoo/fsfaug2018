const path = require('path');
const hbs = require('express-handlebars');

const Giphy = require('./giphy');

const express = require('express');

const GIPHY_KEY = '7cf49b91cbac420198483abde27d622f';

const resources = [ 'public', 'angular' ]

const app = express();
const giphy = Giphy(GIPHY_KEY);

app.engine('hbs', hbs({ defaultLayout: false }));
app.set('view engine', 'hbs')

app.get('/search', (req, resp) => {
    console.log('query = ', req.query);
    giphy.search(req.query.searchTerm, req.query.resultCount)
        .then(result => {
            resp.status(200);
            resp.format({
                'text/html': () => {
                    resp.render('index', {
                        images: result.images,
                        searchTerm: req.query.searchTerm,
                        fromCache: !!result['fromCache']
                    });
                },
                'application/json': () => {
                    resp.json(result);
                }
            })
        })
        .catch(err => {
            resp.status(400).json({error: err });
        })
});

app.get(['/', '/index'], (req, resp) => {
    resp.status(200).type('text/html');
    resp.render('index');
});

for (let r of resources) {
    console.info(`Addding ${r} as static resource`)
    app.use(express.static(path.join(__dirname, r)));
}

const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000
app.listen(PORT, () => {
    console.log(`Application started on port ${PORT}`);
});


