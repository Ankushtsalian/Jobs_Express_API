const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const User = require("../models/User");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  res.send("reg user");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.createdByName = req.user.name;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  res.send("reg user");
};

const deleteJob = async (req, res) => {
  // await Job.deleteMany({ status: "pending" });
  // await User.deleteMany();

  res.send("reg user");
};

module.exports = {
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  getJob,
};
