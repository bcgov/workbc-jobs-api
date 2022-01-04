const jobService = require("../services/jobs.service");

// GET Get Jobs //
exports.getJobs = async (req, res) => {
  try {
    console.log("GET request received to " + req.get("host") + req.originalUrl);
    console.log("request body: ");
    console.log(req.body);
    const jobs = await jobService.getJobs(req.body);

    return res.status(200).json({
      count: jobs.length,
      jobs: jobs
    });

  } catch (err) {
      return res.status(500).send("Internal Server Error");
  }
};

// GET Total Jobs (Count) //
exports.totalJobs = async (req, res) => {
  console.log("GET request received to " + req.get("host") + req.originalUrl);
  console.log("request body: ");
  console.log(req.body);
  try {
    var jobsCount = await jobService.totalJobs();
    return res.status(200).json({ count: jobsCount });
  }

  catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

// GET Search Jobs //
exports.searchJobs = async (req, res) => {
  console.log("GET request received to " + req.get("host") + req.originalUrl);
  console.log("request body: ");
  console.log(req.body);
  try {
    const jobs = await jobService.searchJobs(req.body);

    return res.status(200).json({
      count: jobs.length,
      jobs: jobs
    });

  } catch (err) {
      return res.status(500).send("Internal Server Error");
  }
};