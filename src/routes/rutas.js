const express =require('express');
const rutas = express.Router();
const tokens= require('jsonwebtoken');
const controller = require('../controller/controlador');

function validate(req, res, next) {
    const accesstoken = req.header["accesstoken"] || req.query.accesstoken;
    if (!accesstoken) res.send('no hay accesstoken');
  
    tokens.verify(accesstoken, process.env.SECRETO, (err, ususario) => {
      if (err) res.send("tu token no es valido o expiro");
      next();
    });
  };
  
//render de la vista registro  
rutas.get('/',controller.registro);
//----------------------------------------------------------------

// guardo los datos de la vista registro
rutas.post('/add',controller.save);
//----------------------------------------------------------------

//render de la vista para inicio de sesion
rutas.get('/loguin',controller.loguin);
//----------------------------------------------------------------


//render de la vista registrado
rutas.get('/registrado',validate,controller.registrado);
//----------------------------------------------------------------

rutas.post('/registrado',controller.cosulatar)

//exporto mis rutas
module.exports=rutas;
//----------------------------------------------------------------