const mongoose = require ('mongoose');

const UsersDetailsSchema = new mongoose.Schema ({
  userId: {type: String, default: null},
  photodata: {type: String, default: null},
  isphoto: {type: String, default: null},
  sociallink: {type: Object, default: null },
  taglines:{type: String,default: null}
 
});

module.exports = mongoose.model ('UsersDetails', UsersDetailsSchema);
