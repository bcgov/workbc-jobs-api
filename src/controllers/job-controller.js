const jobDAO = require("../dao/job-dao");

// GET Get Jobs //
exports.getJobs = async (req, res) => {
  try {
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
  try {
    const jobsCount = await jobDAO.totalJobs();
    return res.status(200).json({ count: jobsCount });
  }

  catch (err) {
    return res.status(500).send("Internal server error");
  }
};

// GET Search Jobs //
exports.searchJobs = async (req, res) => {
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