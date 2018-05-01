const mongoose = require ('mongoose');

const FcmSchema = new mongoose.Schema ({
  token: {type: Array, default:[]},
  devicedetail:{type: String, default: null},
  coupontype: {type: String, default: null},
  promotiontype: {type: String, default: null},
  userid: {type: mongoose.Schema.Types.ObjectId,unique: true}
});
 
module.exports = mongoose.model ('Fcm', FcmSchema);
