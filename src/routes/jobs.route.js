const express = require("express");
const router = express.Router();
const JobController = require("../controllers/jobs.controller");

router.get("/", JobController.getJobs);
router.get("/totalJobs", JobController.totalJobs);
router.get("/searchJobs", JobController.searchJobs);
router.get("/getJobDetails", JobController.getJobDetails);

module.exports = router;