
const express = require('express');
const paht = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconne = require('express-myconnection');
const bodyParser = require('body-parser');

require('dotenv').config()

// ----------------------------------------------------------------

const app = express();


//configuro las las vistas y sus rutas
app.set('view engine', 'ejs');
app.set('views', paht.join(__dirname,'views'));
app.use(morgan('dev'));
//----------------------------------------------------------------


//configuracion de mi base de datos
app.use(myconne(mysql, {
    host: "localhost",
    user: "jhon",
    password: "QnEYyHJvlz1vsqHB",
    port: 3306,
    database: "loguin",

}, 'single'))
//----------------------------------------------------------------
// export mis rutas para que el servidor las procese
const rutas = require('./routes/rutas');
app.use('/', rutas);
//---------------------------------------------------------------

//configuro mi servidor para que pueda leer los diferen datos que le enviare 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//------------------------------------------------------------



//configuro mi servidor en el puerto 9000
app.listen(9000, (err) => {
    if (err) throw err
    console.log('server on port 9000');
});
//------------------------------------------------------------


