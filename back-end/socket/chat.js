const sConnectedUser = require('../models/ConnectedUser');

module.exports = function (io) {
  io.on('connection', (socket) => {

    socket.on("register_user", (user)=>{
      console.log(user);
      let newUser = new sConnectedUser({name:user.name, socketId:socket.id})
      newUser.save();
      io.emit("new_user", newUser);
    })
    console.log(`Connecté au client ${socket.id}`);

    // Listener sur la déconnexion
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`);
      io.emit('notification', { type: 'removed_user', data: socket.id });
    });

    socket.on('message_all', (msg) => {
      console.log(msg);
      msg.time = Date.now();
      io.emit("all", msg);
    });

  })
}