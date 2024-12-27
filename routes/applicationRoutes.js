
const express = require('express');
const router = express.Router();
const { authenticateToken, isCompany, isUser } = require('../middlewares/authMiddleware');
const { applyJob, getApplicants, getAppliedJobs } = require( "../controllers/applicationController");

router.get("/user-apply/:id",authenticateToken,isUser,applyJob);
router.get("/user-appliedJobs",authenticateToken,getAppliedJobs);
router.get("/company-getApplicants",authenticateToken,isCompany,getApplicants);

module.exports = router;



