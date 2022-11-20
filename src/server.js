const express = require('express');
const morgan = require('morgan');
const productoRoutes = require('./routes/productoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const path = require('path');
const {Server: ioServer} = require('socket.io');
const http = require('http');
const app = express();
const PORT = 8081 || process.env.PORT;


/**🗨 Tenemos dos servidores:*/
/**1- HTTP SERVER */
const httpServer = http.createServer(app);

/** 2- servidor websocket */
const io = new ioServer(httpServer);
module.exports = {io};
require('./websocket/chat');

//** Middlewares */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/**  🗨 express.static hace pÚblicos los archivos estáticos (pej:css-html-jpg) 
      que esten es la ruta que yo le indique.*/
app.use(express.static(__dirname + '/public'));
app.set('views',path.join(__dirname, '/public/views' ));
app.set('view engine', 'ejs');

app.use((request, response, next) => {
  response.set("X-Content-Type-Options", "nosniff");
  next();
});


/** ROUTER */
app.use("/api/productos", productoRoutes);
app.use("/api/carrito", carritoRoutes);

app.get('/', (req, res) => {
    res.redirect('/api/productos');
}
);


/** CONNECTION SERVER HTTP*/
try {
    httpServer.listen(PORT, () => {
         console.log(
           `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
         );
    });
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}

function onInit() {
  console.log("🔥 ECOMMERCE CODERHOUSE - 1ER ENTREGA");
}

onInit();