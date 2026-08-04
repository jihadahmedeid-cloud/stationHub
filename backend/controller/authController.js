const { validationResult } = require('express-validator');
const { loginAdmin } = require('../services/authServices');


const login = async (req, res, next) => {
   try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array(),
      });
    }

    
    const { email, password } = req.body;

    
    const { token } = await loginAdmin(email, password);

    
    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
