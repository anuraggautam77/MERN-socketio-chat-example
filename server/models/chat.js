const mongoose = require ('mongoose');

const chatSchema = new mongoose.Schema ({
  pingFrom: {type: String, default: "", required: true},
  pingTO: {type: String, default: "", required: true},
  messagetext: {type: String, default: "", required: true},
  chattitle: {type: String, default: "", required: true},
  createdOn: {type: Date, default: Date.now}

});

module.exports = mongoose.model ('Chat', chatSchema);
