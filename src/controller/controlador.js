var tokens= require('jsonwebtoken');

const controller = {};
//----------------------------------------------------------------
controller.registro = (req, res) => {
  res.render("registro");

};
//----------------------------------------------------------------

//render de la vista registrado
controller.registrado = (req, res) => {
    res.render("registrado");
  };
//----------------------------------------------------------------

//render de la vista loguin-------------
controller.loguin = (req, res) => {
  res.render("loguin");
};
//----------------------------------------------------------------


//creo una constante para validar con expressions regular para validar los datos
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};



controller.save = (req, res) => {
  //realizo una validacion de datos para evitar error en los datos
  const { Nombre, Apellido, Numero_documento, Correo, Telefono } = req.body;
  if (
    expresiones.nombre.test(Nombre) &&
    expresiones.nombre.test(Apellido) &&
    expresiones.correo.test(Correo) &&
    expresiones.telefono.test(Telefono) &&
    Numero_documento.length > 6 &&
    Numero_documento.length < 11
  ) {
 //inserto un registro en la base de datos
    req.getConnection((err, conn) => {
      if (err) throw err;
      //metodo de registros seguro evita inyeccion sql
      conn.query("INSERT INTO user set?", [req.body], (err, fila) => {
        if (err) throw err;
        console.log("public");
        res.send(`Proceso Terminado ${Numero_documento} `);
      });
    });
  } else {
    res.send("No se pudo terminar proceso ");
  }
};
//-------------------------------------------------------------
//constante para exportacion de la function
controller.cosulatar = (req, res) => {
  const password = req.body;
//genero un token para el autenticar el ususario
    function token(user) {
        return tokens.sign(user, process.env.SECRETO, { expiresIn:"10m" });
      };
//--------------------------------------------------------------

 
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT email,password FROM userloguin WHERE password=?",[password],(err, fila) =>{
        if (err) throw err;
        
        if (password == password) {
          const user = { password: password };
          const accesstoken=token(user)
          res.header('accesstoken',accesstoken)
         res.render('registrado')
        }
      }
    );
  });
  
};
//----------------------------------------------------------------

module.exports= controller;
