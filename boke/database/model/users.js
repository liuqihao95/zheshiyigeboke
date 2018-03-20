var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const users = new Schema({
    username: String,
    pwd: String,
});

module.exports = mongoose.model('users',users)