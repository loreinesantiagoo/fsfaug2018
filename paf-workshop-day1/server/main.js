//Load libraries
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

//Load an MySQL and configure connection pool
const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost', port: 3306,
    user: 'barney', password: 'barney',
    database: 'rsvp',
    connectionLimit: 4
});

//Create an instance of Express
const app = express();

//Configure the routes
const INSERT_BDAY = 'insert into birthday (email, given_name, phone, attending, remarks) values (?, ?, ?, ?, ?)'
app.post('/rsvp', bodyParser.urlencoded({ extended: true }),
    (req, resp) => {
        pool.getConnection((err, conn) => {
            if (err) 
                return resp.status(400).json({ error: err, status: 'error' });
            conn.query(INSERT_BDAY,
                [ req.body.email, req.body.given_name, req.body.phone, req.body.attending, req.body.remarks ],
                (err) => {
                    if (err)
                        return resp.status(400).json({ error: err , status: 'error' });
                    resp.status(200).json({status: 'success'});
                }
            )
        })
    }
);

app.use(express.static(path.join(__dirname, 'public')));

//Start the server
//Ping the database before starting
pool.getConnection((err, conn) => {
    if (err) {
        console.error('STARTUP ERROR: ', err);
        process.exit(-1);
    }
    conn.ping(err => {
        if (err) {
            console.error('PING ERROR: ', err);
            process.exit(-1)
        }
        conn.release();
        const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
        app.listen(PORT, () => {
            console.info('Application started on PORT %d at %s', PORT, new Date());
        });
    });
});
