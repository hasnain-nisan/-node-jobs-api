

const getAllJobs = async (req, res) => {
  res.send("Get all jobs User");
};

const createJob = async (req, res) => {
  res.send("Create a job");
};

const getJob = async (req, res) => {
  res.send("Get job");
};

const updateJob = async (req, res) => {
  res.send("Update job");
};

const deleteJob = async (req, res) => {
  res.send("Delete job");
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
};