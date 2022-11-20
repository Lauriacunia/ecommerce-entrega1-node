const {Router} = require('express');
const router = Router();
const Container = require('../persistence/container.js');
const file = 'src/productos.txt';
const containerProducts = new Container();
const multer = require('multer');
const myScript = 'public/main.js';

getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

/**  🗨 Configuración de Multer (para subir archivos).
     'photo' es el nombre del campo en el formulario.*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
   
  })
router.use(multer({storage}).single('thumbnail'));


/** LISTAR TODOS LOS PRODUCTOS */
router.get('/', (req, res) => {
   const products = containerProducts.getAll(file)
   const content = "listarProductos";
   res.render('index.ejs', { products ,  myScript, content});
}
);

router.get('/:id', (req, res) => {  
    const { id } = req.params;
    const producto = containerProducts.getById(parseInt(id), file);
    content = "detalleProducto";
    producto ? res.render('index.ejs', { producto, myScript, content }) : res.status(404).json({error: 'producto no encontrado'});
});

/** AGREGAR UN PRODUCTO */
router.post('/', (req, res) => {
  console.log("req.body", req.body);
  const body = req.body;
  const photo = req.file;
  // 🗨 antes de guardar el objeto le añado la propiedad para que se pueda acceder a la foto.
  body.thumbnail = "/uploads/" + photo.filename;
  body.timestamp = Date.now();
  body.stock = getRandomInt(5000);
  body.code = getRandomInt(100000);
  console.log("body", body);
  containerProducts.saveProduct(body, file);
  res.redirect("/api/productos");
}
);

/**🗨 Actualizar debería ser PUT y Borrar DELETE
 *  pero por cuestiones de html y el formulario 
 * solo se puede hacer con POST o GET
 */
router.get("/actualizar/:id", (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  const producto = containerProducts.getById(parseInt(id), file);
  const content = "actualizarProducto";
  producto ? res.render('index.ejs', { producto, myScript, content }) : res.status(404).json({error: 'producto no encontrado'});
});

router.post('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log("id", id);
    console.log("req.body", req.body);
    const photo = req.file;
    // 🗨 antes de guardar el objeto le añado la propiedad para que se pueda acceder a la foto.
    body.thumbnail = "/uploads/" + photo.filename;
    const product = containerProducts.getById(parseInt(id), file);
    product ? containerProducts.updateProduct(id,body, file) : res.json({message: 'Producto no encontrado. Id: '+ id});
    res.redirect("/api/productos");
}
);

router.post('/borrar/:id', (req, res) => {
    console.log("borrar producto id:", req.params.id);
    const { id } = req.params;
    const product = containerProducts.getById(parseInt(id), file);
    product
      ? containerProducts.deleteById(id, file)
      : res.json({ message: "Producto no encontrado. Id: " + id }).status(400);
    res.redirect("/api/productos");
}
);


module.exports = router;