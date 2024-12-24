const express = require('express');
const router = express.Router();
const { registerCompany, loginCompany, getProfile, updateProfile } = require('../controllers/companyController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/registration', registerCompany);
router.post('/login', loginCompany);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
