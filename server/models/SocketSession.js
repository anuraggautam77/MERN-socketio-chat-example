const mongoose = require ('mongoose');

const SocketSessionSchema = new mongoose.Schema ({
  userId: {type: String, default: null},
  socketId: {type: String, default: null},
  expireOn: {type: String, default: null},
  createdOn: {type: Date, default: Date.now}
 });

module.exports = mongoose.model ('SocketSession', SocketSessionSchema);
