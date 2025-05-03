const express = require('express');
const { handleLogin, handleRegister } = require('../services/authServices');
const router = express.Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);

module.exports = router;
