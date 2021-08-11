const express = require("express");
const router = express.Router();

const JobController = require("../controllers/job-controller");

router.get("/getJobs/:payload", JobController.getJobs);
router.get("/totalJobs", JobController.totalJobs);

module.exports = router;