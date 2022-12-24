const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const User = require("../models/User");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  //userId from auth middleware where we set req.user
  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) throw new NotFoundError(`No job with id ${jobId}`);

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.createdByName = req.user.name;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    params: { id: jobId },
    user: { userId },
  } = req;

  if (company === "" || position === "")
    throw new BadRequestError(`company or position cannot be empty`);
  //userId from auth middleware where we set req.user
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) throw new NotFoundError(`No job with id ${jobId}`);

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

  const findJob = await Job.findById({ _id: jobId });

  // console.log("jobId:", jobId, "userId:", userId);
  // console.log("job.createdBy :", job.createdBy);

  if (userId != String(findJob.createdBy))
    throw new UnauthenticatedError(`Unauthorized user`);

  if (!findJob) throw new NotFoundError(`No job with id ${jobId}`);

  const job = await Job.findByIdAndRemove({ _id: jobId });

  res.status(StatusCodes.OK).send(`Job with id ${jobId} removed`);
};

module.exports = {
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  getJob,
};
