const express = require("express");
const router = express.Router();
const JobController = require("../controllers/jobs.controller");

router.get("/", JobController.GetJobs);
router.get("/TotalJobs", JobController.TotalJobs);
router.get("/SearchJobs", JobController.SearchJobs);
router.get("/GetJobDetails", JobController.GetJobDetails);
router.get("/SearchCities", JobController.SearchCities)

module.exports = router;