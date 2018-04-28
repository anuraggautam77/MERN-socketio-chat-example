const mongoose = require ('mongoose');

const FcmSchema = new mongoose.Schema ({
  token: {type: String, default: null,unique: true},
  devicedetail:{type: String, default: null}
   
});
 
module.exports = mongoose.model ('Fcm', FcmSchema);
