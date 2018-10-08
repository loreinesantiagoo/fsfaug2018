const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
    host: 'localhost', port: 3306,
    user: 'fred', password: 'fred',
    database: 'addressbook',
    connectionLimit: 4
});

const app = express();

//app.use(bodyParser.urlencoded());

const FRIENDS_INSERT = 'insert into friends (email, last_name, nickname, dob) values (?, ?, ?, ?)';
app.post('/add_friend', bodyParser.urlencoded(),
    (req, resp) => {
        console.log('>> body: ', req.body);
        pool.getConnection((err, conn) => {
            if (err) {
                console.error('DB ERROR: ', err);
                process.exit(-1);
            }
            conn.query(
                FRIENDS_INSERT, 
                [ req.body.email, req.body.last_name, req.body.nickname, req.body.dob],
                (err, result) => {
                    conn.release();
                    if (err) 
                        return resp.status(400).json({ error: err });
                    resp.status(200);
                    resp.format({
                        'application/json': () => resp.json({ success: true }),
                        default: () => resp.json({ success: true })
                    })
                }
            )
        });
    }
);


app.get('/friends', (req, resp) => {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    pool.getConnection((err, conn) => {
        if (err) {
            console.error('DB ERROR: ', err);
            process.exit(-1);
        }
        conn.query(
            'select * from friends limit ? offset ?', [ limit, offset ],
            (err, result) => {
                conn.release();
                if (err) 
                    return resp.status(400).json({ error: err });
                resp.status(200);
                resp.format({
                    'application/json': () => resp.json(result),
                    default: () => resp.json(result)
                })
            }
        )
    });

});

app.use(express.static(path.join(__dirname, 'public')));

//Start server
pool.getConnection((err, conn) => {
    if (err) {
        console.error('DB ERROR: ', err);
        process.exit(-1);
    }
    conn.ping(err => {
        if (err) {
            console.error('DB ERROR: ', err);
            process.exit(-1);
        }
        conn.release()
        const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
        app.listen(PORT, () => {
            console.info('Application started on port %d at %s', PORT, new Date());
        });
    })
})