// jobRoutes.js

const express = require('express');
const router = express.Router();
const { createJob, getJobs, deleteJob } = require('../controllers/jobController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/createJob', authenticateToken, createJob);
router.get('/allJobs', getJobs);
router.delete('/allJobs/:id', authenticateToken, deleteJob);

module.exports = router;
