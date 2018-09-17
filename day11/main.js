//Load some libraries
const path = require('path');
const express = require('express');

//create an instance of Express
const app = express();

//define our routes - rules to handle requests
//runtime
app.use( express.static( path.join(__dirname, 'images')));

app.use( express.static( path.join(__dirname, 'public')));

//catch all
app.use(
    (req, resp) => { //middleware
        resp.status(404);
        resp.sendfile(path.join(__dirname, 'images', '404.gif'));
    }
);

//Start express and listen to a port
//app.listen(3000, function() {
app.listen(3000, () => {
    console.info('Applicaiton started on port 3000');
    console.info('\trunning directory is ', __dirname);
});