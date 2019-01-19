var mongoose = require ("mongoose");

//saves a reference to Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }
});

var Article = mongoose.model("articles", ArticleSchema);

module.exports = Article;