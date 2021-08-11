var jobs = require('./json/job.json');

exports.getJobs = async (params) => {
  try {
    let jobTitle = params.jobTitle?.toLowerCase().trim();
    let minimumPostedDate = params.minimumPostedDate ? new Date(params.minimumPostedDate) : null;

    var results = jobs.jobs.filter(job => 
      // Job Title //
      (jobTitle ? 
        job.jobTitle?.toLowerCase().includes(jobTitle)
        : true) &&

      // Minimum Posted Date //
      (minimumPostedDate ? 
        (job.postedDate ? new Date(job.postedDate) >= minimumPostedDate : false)
        : true)
    );

    return results;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.totalJobs = async () => {
  try {
    return jobs.count;
  }
  
  catch (err) {
    console.log(err);
    throw err;
  }
};

exports.searchJobs = async (params) => {
  try {
    let jobTitle = params.jobTitle.toLowerCase().trim();
    let location = params.location.toLowerCase().trim();

    var results = jobs.jobs.filter(job => 
      // Job Title //
      ((jobTitle && job.jobTitle) ? job.jobTitle.toLowerCase().includes(jobTitle) : false) ||

      // Location //
      ((location && job.locations) ? job.locations.some(loc => {
        return (
          loc.city.toLowerCase().trim() == location ||
          loc.region?.caption?.toLowerCase().trim() == location ||
          loc.province.toLowerCase().trim() == location
        );
      }) : false)
    );

    return results;

  } catch (error) {
    console.log(error);
    throw error;
  }
}