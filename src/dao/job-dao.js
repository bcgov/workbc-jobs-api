var jobs = require('./json/job.json');

exports.getJobs = async (sub, payload) => {
  try {
    let payloadJSON = JSON.parse(payload);
    //console.log(payloadJSON);
    // console.log(payloadJSON.keyword);

    // jobResults = jobs.jobs.filter(i => i.jobTitle.includes(payloadJSON.keyword));

    let results = [];
    var jobData = jobs.jobs.filter(i => i.jobTitle != null);
    
    for (var i = 0; i < jobData.length; i++) {
      var title = jobData[i].jobTitle;
      // console.log(title);
      if (title)
        if (title.toLowerCase().search(payloadJSON.keyword.toLowerCase()) > -1) {
          results.push(jobData[i]);
        }
    }
    // console.log("results");
    // console.log(results);
    return results;

  } catch (err) {
    console.log(err);
    throw err;
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