const { Router } = require("express");
const router = Router();
const file = "src/carrito.txt";
const Container = require("../persistence/container.js");
const containerProducts = new Container();


router.get("/", (req, res) => {
    res.render("baseCarrito.ejs");
    }
);


module.exports = router;