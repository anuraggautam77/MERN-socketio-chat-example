const mongoose = require ('mongoose');
const chatTypeSchema = new mongoose.Schema ({
  initiateby: {type: String, default: ""},
  chatinbetween: {type: String, default: ""},
  chatmember:{type: Array, default:[] },
  createdOn: {type: Date, default: Date.now}

});

module.exports = mongoose.model ('ChatType', chatTypeSchema);
