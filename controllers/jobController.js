
// jobController.js
const Job = require('../models/jobModel');

exports.createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user.id });
    await job.save();
    res.status(201).send(job);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.send(jobs);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).send('Job not found');
    res.send(job);
  } catch (err) {
    res.status(400).send(err);
  }
};