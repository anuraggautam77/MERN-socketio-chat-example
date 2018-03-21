const mongoose = require ('mongoose');

const CommentSchema = new mongoose.Schema ({
    comment: {type: String},
    postby: {type: mongoose.Schema.Types.ObjectId},
    date: {type: Date,default: Date.now},
    postid:{type:mongoose.Schema.Types.ObjectId}
   
});
 
module.exports = mongoose.model ('Comment', CommentSchema);
