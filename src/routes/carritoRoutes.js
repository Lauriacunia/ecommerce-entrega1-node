const { Router } = require("express");
const router = Router();
const file = "src/carrito.txt";
const Container = require("../persistence/container.js");
const containerProducts = new Container();
const myScript = 'public/main.js';

router.get("/", (req, res) => {
   const carrito = null;
   content = "carrito";
   res.render('index.ejs', { carrito, myScript, content })
});



module.exports = router;