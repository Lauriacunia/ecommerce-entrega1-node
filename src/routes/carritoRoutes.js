const { Router } = require("express");
const router = Router();
const file = "src/carrito.txt";
const Container = require("../persistence/container.js");
const container = new Container();
const myScript = 'public/main.js';

const admin = false;

router.get("/", (req, res) => {
   if(admin){
      const carrito = null;
      const mensaje = null;
      content = "carrito";
      res.render("index.ejs", { carrito, myScript, content, mensaje });
   }else{
      //res.redirect("/login");
      const carrito = null;
      content = "carrito";
      const mensaje = "No tiene permisos para acceder a esta sección";
      res.render("index.ejs", { carrito, myScript, content, mensaje });
   }
  
});



module.exports = router;