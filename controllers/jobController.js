// jobController.js

const Job = require('../models/jobModel');
const Company = require("../models/companyModel");

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      qualification,
      salary,
      location,
      jobType,
      experience,
      position,
    } = req.body;

    const companyId = req.user.id
    console.log(companyId,"COMPANYiD")

    // Validate required fields
    if (
      !title || !description || !requirements || !qualification ||
      !salary || !location || !jobType || !experience ||
      !position
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false
      });
    }

    // Ensure requirements and qualification are arrays
    const formattedRequirements = Array.isArray(requirements)
      ? requirements
      : requirements.split(",").map((item) => item.trim());

    const formattedQualification = Array.isArray(qualification)
      ? qualification
      : qualification.split(",").map((item) => item.trim());

    const companyDetails = await Company.findById(companyId);

    if (!companyDetails) {
      return res.status(404).json({
        message: "Company not found.",
        success: false
      });
    }

    // Create job
    const job = await Job.create({
      title,
      description,
      requirements: formattedRequirements,
      qualification: formattedQualification,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyDetails
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred.",
      error: err.message,
      success: false
    });
  }
};


exports.getJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]
    };
    const jobs = await Job.find(query).populate({
      path: "company"
    }).sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      })
    };
    return res.status(200).json({
      jobs,
      success: true
    })
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find the job by ID and populate the company, selecting specific fields
    const job = await Job.findById(jobId).populate({
      path: "company",
      select: "_id companyName companyWebsiteLink companyEstablishedDate" // Include only these fields
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false
      });
    }

    return res.status(200).json({ job, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
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