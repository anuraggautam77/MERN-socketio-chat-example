const mongoose = require ('mongoose');

const UsersSchema = new mongoose.Schema ({
  firstName: {type: String, default: null},
  lastName: {type: String, default: null},
  city:{type: String, default: null},
  country:{type: String, default: null},
  registerTime: {type: Date, default: Date.now},
  email: {type: String, required: true, unique: true},
  password: {type: String, default: null},
  token: {type: String, default: null},
  friends: [{status: String, userid: mongoose.Schema.Types.ObjectId, ftype:String}],
  userId:{type: String, default: null}
   
});
 
module.exports = mongoose.model ('Users', UsersSchema);
