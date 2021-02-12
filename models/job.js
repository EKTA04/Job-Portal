var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var jobSchema = new mongoose.Schema({
    companyname: String,
    designation: String,
    description: String,
    salary:Number,
    startdate: { type: Date },
    updated_date: { type: Date, default: Date.now },
    applicants: [ 
        {
            type: Schema.Types.ObjectId,
            ref: 'Applicant'
        }
    ]
});

module.exports = mongoose.model('Job', jobSchema);