const express = require('express');
const router = express.Router();
const users = require('../controllers/users_controller');
router.get('/profile', users.profile);
module.exports = router;