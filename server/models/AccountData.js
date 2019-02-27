let mongoose = require('mongoose');
let accountDataSchema = require('../schemas/accountData');

module.exports = mongoose.model('AccountData',accountDataSchema);