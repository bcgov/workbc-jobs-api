exports.getJobs = async (params) => {
  try {
    delete require.cache[require.resolve('./json/job.json')];
    var jobs = require('./json/job.json');
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
    delete require.cache[require.resolve('./json/job.json')];
    var jobs = require('./json/job.json');
    return jobs.count;
  }
  
  catch (err) {
    console.log(err);
    throw err;
  }
};

exports.searchJobs = async (params) => {
  try {
    delete require.cache[require.resolve('./json/job.json')];
    var jobs = require('./json/job.json');
    let jobTitle = params.jobTitle?.toLowerCase().trim();
    let location = params.location?.toLowerCase().trim();

    if (!jobTitle && !location){
      return [];
    }

    var results = jobs.jobs.filter(job => 
      // Job Title //
      (jobTitle ? job.jobTitle?.toLowerCase().includes(jobTitle) : true) &&

      // Location //
      (location ? job.locations?.some(loc => {
        return (
          loc.city.toLowerCase().trim() == location ||
          loc.region?.caption?.toLowerCase().trim() == location ||
          loc.province.toLowerCase().trim() == location
        );
      }) : true)
    );

    return results;

  } catch (error) {
    console.log(error);
    throw error;
  }
}