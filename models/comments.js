var mongoose = require ("mongoose");

//saves a reference to Schema constructor

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    title: String,
    body: String,
    name: String
});

var Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;