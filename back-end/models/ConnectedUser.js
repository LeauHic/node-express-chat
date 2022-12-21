const mongoose = require('mongoose');

const connectedUserSchema = mongoose.Schema({
  socketId: { type: String, required: true },
  name: { type: String, required: true },  
});

module.exports = mongoose.model('ConnectedUser', connectedUserSchema);