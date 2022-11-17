// traer el io del server.js
const io = require('../server.js').io;
//
const messages = [];

// Nuevo servidor para el chat
io.on("connection", (socket) => {
  // el socket trae toda la data del cliente
  console.log("New user connected. Soquet ID : ", socket.id);

  /** on para escuchar
   *  emit para enviar
   */
  socket.on("set-name", (name) => {
    console.log("set-name", name);
    socket.emit("user-connected", name);
    socket.broadcast.emit("user-connected", name);
  });

  /** El servidor recibe los nuevos mensajes y los re-envia los */
  socket.on("new-message", (message) => {
    messages.push(message);
    socket.emit("messages", messages);
    socket.broadcast.emit("messages", messages);
  });

  // socket.emit('messages', messages);
  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});
