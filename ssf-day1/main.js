//Step 1: load path and express
const path = require('path');
const express = require('express');

//Step 2: create an instance of the application
const app = express();

//Step 3: define routes

//Serve resources from public
app.use(express.static(path.join(__dirname, 'testng')));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, resp) => {
    resp.redirect('/');
    //resp.status(404);
    //resp.sendfile(path.join(__dirname, 'public', '404.html'));
});

//Step 4: start the server
//Evaluation order: cmd arguments, env variable, default
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});