var mongoose = require('mongoose');

var applicantSchema = new mongoose.Schema({
    name: String,
    contact:Number,
    email: String
});

module.exports = mongoose.model('Applicant', applicantSchema);