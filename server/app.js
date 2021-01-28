require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let log = require('./controllers/logcontroller');
let user = require('./controllers/usercontroller');

// Use the variable to call .sync() which syncs defined models to the DB
sequelize.sync();
//sequelize.sync({force: true}) 
//above line forces database to restart from scratch

app.use(express.json());

app.use('/user', user);

app.use('/log', log);

app.use('/test', function(req, res) {
    res.send('This is a message from the test endpoint on the server.');
})

app.listen(3000, function(){
    console.log('App is listening on port 3000.');
})