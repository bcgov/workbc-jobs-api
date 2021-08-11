var jobs = require('./json/job.json');

exports.getJobs = async (params) => {
  try {
    let jobTitle = params.jobTitle ? params.jobTitle.toLowerCase().trim() : null;
    let minimumPostedDate = params.minimumPostedDate ? new Date(params.minimumPostedDate) : null;

    var results = jobs.jobs.filter(job => 
      // Job Title //
      (jobTitle ? 
        (job.jobTitle ? job.jobTitle.toLowerCase().includes(jobTitle) : false)
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
    let jobTitle = params.jobTitle ? params.jobTitle.toLowerCase().trim() : null;
    let location = params.location ? params.location.toLowerCase().trim() : null;

    var results = jobs.jobs.filter(job => 
      // Job Title //
      ((jobTitle && job.jobTitle) ? job.jobTitle.toLowerCase().includes(jobTitle) : false) ||

      // Location //
      ((location && job.locations) ? job.locations.some(loc => {
        return (
          loc.city ? loc.city.toLowerCase().trim() == location : false ||
          loc.region && loc.region.caption ? loc.region.caption.toLowerCase().trim() == location : false ||
          loc.province ? loc.province.toLowerCase().trim() == location : false
        );
      }) : false)
    );

    return results;

  } catch (error) {
    console.log(error);
    throw error;
  }
}