const mongoose = require('mongoose');
mongoose.Promisse = global.Promise;

module.exports = mongoose.connect('mongodb://localhost/todo');