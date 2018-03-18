const mongoose = require ('mongoose');

const PostSchema = new mongoose.Schema ({
   
    title: {type: String},
    body: {type: String},
    date: {type: Date,default: Date.now},
    tags:{type: String},
    flag:{type:String},
    _author: {type: mongoose.Schema.Types.ObjectId}
   
});
 
module.exports = mongoose.model ('Post', PostSchema);
