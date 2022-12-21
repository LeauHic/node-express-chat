const mongoose = require('mongoose');

const mainConversationSchema = mongoose.Schema({
  userId: { type: Number, required: true },
  timestamp: { type: Date, required: true },  
  message: { type: String, required: true }
});

module.exports = mongoose.model('MainConversation', mainConversationSchema);