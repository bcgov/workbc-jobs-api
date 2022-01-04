const { DateTime } = require("luxon");
const { jobsApi } = require("../config/config");
const PAGE_SIZE = 30;

module.exports.getJobs = async (params) => {
  try {
    let jobTitle = params.jobTitle?.trim();
    let minimumPostedDate;
    if (params.minimumPostedDate)
      minimumPostedDate = DateTime.fromISO(params.minimumPostedDate); 

    const jobs = await jobsApi.post("Search/JobSearch", 
      JSON.stringify({
        page: params.page ? params.page : 1,
        pageSize: PAGE_SIZE,
        keyword: jobTitle,
        searchInField: "title",
        startDate: minimumPostedDate ? {
          year: minimumPostedDate.year,
          month: minimumPostedDate.month,
          day: minimumPostedDate.day
        } : null,
        searchDateSelection: 3 // required when using startDate (3 corresponds to 'date range')
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return jobs.data.result;

  } catch (error) {
      console.log(error);
      throw error;
  }
}

module.exports.totalJobs = async () => {
  try { 
    const jobsCount = await jobsApi.get("Search/GetTotalJobs");
    return jobsCount.data;
  }
  
  catch (err) {
    console.log(err);
    throw err;
  }
},

module.exports.searchJobs = async (params) => {
  try {
    let jobTitle = params.jobTitle ? params.jobTitle.toLowerCase().trim() : "";
    let location = params.location ? params.location.trim() : "";

    if (!params.jobTitle && !params.location){
      return [];
    }

    const jobs = await jobsApi.post("Search/JobSearch", 
      JSON.stringify({
        page: params.page ? params.page : 1,
        pageSize: PAGE_SIZE,
        keyword: jobTitle,
        searchInField: "title",
        searchLocations: [
          {
            city: location, // case insensitive
            region: "",
            postal: ""
          },
          {
            city: "",
            region: capitalizeFirstLetter(location), // region seems to be case sensitive and likes having the first letter capitalized
            postal: ""
          },
          {
            city: "",
            region: "",
            postal: location // T3X 5V0 and T3X5V0 are both acceptable (i.e. spacing doesn't matter)
          }
        ],
        searchLocationDistance: -1 // required when using searchLocations
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return jobs.data.result;

  } catch (error) {
      console.log(error);
      throw error;
  }
}


// HELPER FUNCTIONS //
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}