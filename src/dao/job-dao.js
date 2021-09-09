//var jobs = require('./json/job.json');
var fs = require('fs')

module.exports.getJobs = async (params) => {
  try {
    let jobs = JSON.parse(fs.readFileSync('src/dao/json/job.json', 'utf8'));
    //console.log(jobs)
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
}

module.exports.totalJobs = async () => {
  try { 
    let importedJobs = JSON.parse(fs.readFileSync('src/dao/json/job.json', 'utf8'));
    //console.log(importedJobs)
    return importedJobs.count;
  }
  
  catch (err) {
    console.log(err);
    throw err;
  }
},

module.exports.searchJobs = async (params) => {
  try {
    let jobs = JSON.parse(fs.readFileSync('src/dao/json/job.json', 'utf8'));
    //console.log(jobs)
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

