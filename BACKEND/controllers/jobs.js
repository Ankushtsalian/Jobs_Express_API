const getAllJobs = async (req, res) => {
  res.send("reg user");
};

const getJob = async (req, res) => {
  res.send("reg user");
};

const createJob = async (req, res) => {
  res.json(req.user);
};

const updateJob = async (req, res) => {
  res.send("reg user");
};

const deleteJob = async (req, res) => {
  res.send("reg user");
};

module.exports = {
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  getJob,
};
