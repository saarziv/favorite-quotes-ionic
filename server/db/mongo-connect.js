const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

mongoose.connect(url);

module.exports = { mongoose };
