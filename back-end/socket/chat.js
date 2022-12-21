module.exports = function (io) {

  io.on('connection', (socket) => {
    console.log(`Connecté au client ${socket.id}`)
    io.emit('new_user', { type: 'new_user', data: socket.id });
    
    io.emit("all", {sender:"DIEU", time:Date.now(), content:"Un nouvel utilisateur est apparu"});

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