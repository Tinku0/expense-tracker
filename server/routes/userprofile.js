const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userprofile');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/get', getUserProfile);
router.put('/update', upload.single('avatar'), updateUserProfile);

module.exports = router;