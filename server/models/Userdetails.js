const mongoose = require ('mongoose');

const UsersDetailsSchema = new mongoose.Schema ({
  userId: {type: String, default: null},
  photodata: {type: String, default: null},
  isphoto: {type: String, default: null},
  sociallink: {type: Object, default: null},
  taglines:{type: String,default: null},
  hobbies:{type:Array, defaul:[]},
  skills:{type:Array, default:[]}
 
});

module.exports = mongoose.model ('UsersDetails', UsersDetailsSchema);
