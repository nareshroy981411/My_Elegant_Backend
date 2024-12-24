// adminRoutes.js

const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/users', authenticateToken, getAllUsers);
router.delete('/users/:id', authenticateToken, deleteUser);

module.exports = router;
