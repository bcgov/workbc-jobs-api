var express = require('express');
var cors = require('cors');
var app = express();
require('dotenv').config();
var jobRouter = require('./routes/job');
const router = express.Router();
var cron = require('node-cron');
var spawn = require('child_process').spawn;
const PythonShell = require('python-shell').PythonShell;



cron.schedule('0 0 0 * * *', () => { // will run at midnight daily
  console.log("Starting job listings import ...");
  PythonShell.run('src/scripts/import_job_listings.py', null, function (err, res) {
    if (err) throw err;
    console.log("Finished job listings import!");
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })) //Parse URL-encoded bodies
app.use(cors());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081,
  ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.use('/jobs', jobRouter);

app.get('/', function (req, res) {
  res.send("WORKBC-JOBS-API: Server is Running.");
});

app.listen(port, function () {
  console.log('Started at port %s', port);
});