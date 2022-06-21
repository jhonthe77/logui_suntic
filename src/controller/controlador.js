var tokens= require('jsonwebtoken');

const controller = {};

controller.registro = (req, res) => {
  res.render("registro");

};


controller.registrado = (req, res) => {
    res.render("registrado");
  
  };


controller.loguin = (req, res) => {
  res.render("loguin");
};



const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};



controller.save = (req, res) => {
  const { Nombre, Apellido, Numero_documento, Correo, Telefono } = req.body;

  if (
    expresiones.nombre.test(Nombre) &&
    expresiones.nombre.test(Apellido) &&
    expresiones.correo.test(Correo) &&
    expresiones.telefono.test(Telefono) &&
    Numero_documento.length > 6 &&
    Numero_documento.length < 11
  ) {
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


controller.cosulatar = (req, res) => {

    function token(user) {
        return tokens.sign(user, process.env.SECRETO, { expiresIn:"10m" });
      };


  const { password } = req.body;
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

module.exports= controller;
