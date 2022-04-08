const axios = require('axios');
const jobsBaseUrl = process.env.WBC_JOBS_URL || '';

const jobsApi = axios.create(
    {
      baseURL: jobsBaseUrl
    }
);

module.exports = {
    jobsApi
};