// jobRoutes.js

const express = require('express');
const { authenticateToken, isCompany } = require('../middlewares/authMiddleware');
const { createJob, getJobs, getJobById, deleteJob } = require('../controllers/jobController');

const router = express.Router();

router.post("/createJob",authenticateToken,isCompany,createJob)
router.get("/allJobs",authenticateToken,getJobs)
router.get("/getJob/:id",authenticateToken,getJobById)
router.delete('/job/:id',authenticateToken,isCompany,deleteJob)


module.exports = router;
