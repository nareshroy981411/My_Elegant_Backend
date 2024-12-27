

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { applyJob, getApplicants, getAppliedJobs, updateStatus } = require( "../controllers/applicationController");

router.get("/apply/:id",authenticateToken , applyJob);
router.get("/get",authenticateToken , getAppliedJobs);
router.get("/:id/applicants",authenticateToken , getApplicants);
router.post("/status/:id/update",authenticateToken , updateStatus);
 

module.exports = router;



