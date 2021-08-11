const jobDAO = require("../dao/job-dao");

exports.getJobs = async (req, res, next) => {
  try {
    const { headers, params } = req;
    const { payload } = params;
    let sub = "";
    // console.log(payload);
    const jobs = await jobDAO.getJobs(sub, payload);

    return res.status(200).json({
      Result: "Success",
      Data: jobs
    });


    // (!payloadJSON.lang) ? { lang = "EN" } : { lang = payloadJSON.lang };

    // await services.jobApi.post("/jobs/",
    //   {
    //     lastRequestDate: "2018-08-29",
    //     region: 1,
    //     city: "Victoria",
    //     jobTypes: [
    //       1
    //     ],
    //     majorProjects: false
    //   }
    // ).then(result => {
    //   console.log(result.data.jobs);
    //   return res.status(200).json({
    //     Result: "Success",
    //     Data: result.data.jobs.filter(item => item.jobTitle != null)
    //   });
    // })

  } catch (err) {
    // debug(err);

    return res.status(500).json({
      message: err + "-Error when trying to search jobs."
    });
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