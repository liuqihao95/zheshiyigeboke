var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    cat: String,
    title: String,
    cover: String,
    summary: String,
    content: String,
    time: String,
});

module.exports = mongoose.model('article', userSchema, 'article');