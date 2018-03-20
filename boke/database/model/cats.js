var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const cats = new Schema({
    title: String,
    sort: String,
});

module.exports = mongoose.model('cats',cats)