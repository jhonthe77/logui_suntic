const express = require('express');
const paht = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconne = require('express-myconnection');
const bodyParser = require('body-parser');
require('dotenv').config()




const app = express();
app.set('view engine', 'ejs');
app.set('views', paht.join(__dirname,'views'));
app.use(morgan('dev'));
app.use(myconne(mysql, {
    host: "localhost",
    user: "jhon",
    password: "QnEYyHJvlz1vsqHB",
    port: 3306,
    database: "loguin",

}, 'single'))


const rutas = require('./routes/rutas');
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', rutas);
app.use(bodyParser.json());





app.listen(9000, (err) => {
    if (err) throw err
    console.log('server on port 9000');
});



