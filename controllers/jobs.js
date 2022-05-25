
const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getAllJobs = async (req, res) => {
  const jobs = await Job.find({
    createdBy: req.user.id
  }).sort('createdAt')

  res.status(StatusCodes.OK).send({
    jobs: jobs,
    count: jobs.length
  })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user._id
  const job = await Job.create({...req.body})
  
  res.status(StatusCodes.CREATED).send({
    job: job
  })
};

const getJob = async (req, res) => {
  const {id} = req.params
  const {_id} = req.user
  const job = await Job.findOne({
    _id: id,
    createdBy: _id
  })

  if(!job){
    throw new NotFoundError(`No job found with the id:${id}`);
  }

  res.status(StatusCodes.OK).send({
    job: job
  });
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const {company, position, status } = req.body

  if(company === "" || position === "" || status === ""){
    throw new BadRequestError('Company, position or status must not be empty')
  }

  const job = await Job.findByIdAndUpdate(
    { _id: id, createdBy: _id,},
    {...req.body},
    {new: true, runValidators: true}
  );

  if(!job){
    throw new NotFoundError('Job not found')
  }

  res.status(StatusCodes.OK).send({ job: job });
};

const deleteJob = async (req, res) => { 
  const { id } = req.params;
  const { _id } = req.user;

  const job = await Job.findByIdAndRemove({
    _id: id, 
    createdBy: _id
  })

  if(!job) {
    throw new NotFoundError('Job not found')
  }

  res.status(StatusCodes.OK).send()
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
};