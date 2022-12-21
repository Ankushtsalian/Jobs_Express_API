const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  res.send("reg user");
};

const getJob = async (req, res) => {
  res.send("reg user");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
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
