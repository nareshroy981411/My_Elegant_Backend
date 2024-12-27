

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { applyJob, getApplicants, getAppliedJobs, updateStatus } = require( "../controllers/applicationController");

router.get("/user-apply/:id",authenticateToken , applyJob);
router.get("/user-appliedJobs",authenticateToken , getAppliedJobs);
router.get("/company-getApplicants",authenticateToken , getApplicants);
// router.post("/status/:id/update",authenticateToken , updateStatus);
 

module.exports = router;



