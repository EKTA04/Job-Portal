const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const app = express();

var Job = require('./models/job.js');
var Applicant = require('./models/applicant.js');

mongoose.connect('mongodb://localhost:27017/jobPortal', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));

app.set('view options', { layout: './layouts/header' });
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', async(req, res) => {
        const jobs = await Job.find({});
        res.render('home', { jobs })
    }
)

app.get('/newJob', async(req, res) => {
    res.render('new_job')
})

app.post('/newJob', async(req, res) => {
    console.log(req.body)
    const job = new Job(req.body.job);
    await job.save();
    console.log(job);
    res.redirect('/')
})

app.get('/jobs/:id', async (req, res,) => {
    const job = await Job.findById(req.params.id)
    console.log(job);
    if(!job) {
        return res.redirect('/');
    }
    res.render('show', { job });
})

app.get('/jobs/:id/apply', async(req, res) => {
    const job = await Job.findById(req.params.id)
    console.log(job);
    if(!job) {
        return res.redirect('/');
    }
    res.render('applicant_details', { job })
})

app.post('/jobs/:id/apply', async(req, res) => {
    const job = await Job.findById(req.params.id);
    const applicant = new Applicant(req.body.applicant);
    job.applicants.push(applicant);
    await applicant.save();
    await job.save();
    console.log('Successfully applied')
    res.redirect(`/jobs/${job._id}`);
})

app.all('*', (req, res, next) => {
    res.status(404).send('<h3> Sorry, can\'t find the requested page </h3>');
})

app.listen(3000, ()=> {
    console.log('Serving on port 3000');
})