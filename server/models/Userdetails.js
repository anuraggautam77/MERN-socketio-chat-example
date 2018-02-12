const mongoose = require ('mongoose');

const UsersDetailsSchema = new mongoose.Schema ({
  userId: {type: String, default: null},
  photodata: {type: String, default: null},
  isphoto: {type: String, default: null},
  aboutme:{type: Object, default: {}},
  professional:{type: Object, default: {}},
  sociallink: {type:Array, default:[]}
});

module.exports = mongoose.model ('UsersDetails', UsersDetailsSchema);
