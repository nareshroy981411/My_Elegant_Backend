// jobRoutes.js

const express = require('express');
const router = express.Router();
const { createJob, getJobs, deleteJob, getJobById } = require('../controllers/jobController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/createJob',authenticateToken,createJob);
router.get('/allJobs',authenticateToken, getJobs);
router.get("/get/:id", authenticateToken, getJobById);
router.delete('/allJobs/:id',authenticateToken, deleteJob);

module.exports = router;
