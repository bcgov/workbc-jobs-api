const jobDAO = require("../dao/job-dao");

// GET Get Jobs //
exports.getJobs = async (req, res) => {
  try {
    console.log("POST request received to " + req.get("host") + req.originalUrl);
    console.log("request body: ");
    console.log(req.body);
    const jobs = await jobDAO.getJobs(req.body);

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
  console.log("POST request received to " + req.get("host") + req.originalUrl);
  console.log("request body: ");
  console.log(req.body);
  try {
    var jobsCount = await jobDAO.totalJobs();
    return res.status(200).json({ count: jobsCount });
  }

  catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

// GET Search Jobs //
exports.searchJobs = async (req, res) => {
  console.log("POST request received to " + req.get("host") + req.originalUrl);
  console.log("request body: ");
  console.log(req.body);
  try {
    const jobs = await jobDAO.searchJobs(req.body);

    return res.status(200).json({
      count: jobs.length,
      jobs: jobs
    });

  } catch (err) {
      return res.status(500).send("Internal Server Error");
  }
};