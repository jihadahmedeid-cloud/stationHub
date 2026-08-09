const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { login } = require('../controller/authController');


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: 'Too many login attempts. Try again later.'
  }
});


const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth route is working"
    });
});




router.post('/login', loginLimiter, loginValidation, login);

module.exports = router;
