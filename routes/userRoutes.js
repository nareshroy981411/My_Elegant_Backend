// userRoutes.js

const express = require('express');
const multer = require('multer');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log('Setting upload directory');
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      console.log('Uploading file:', file.originalname);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
  

router.post('/register', upload.single('resume'), registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);


module.exports = router;
