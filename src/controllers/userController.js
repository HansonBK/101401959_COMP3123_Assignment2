
const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: false,
        message: 'username, email and password are required',
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: 'Username or email already exists',
      });
    }

    const user = await User.create({ username, email, password });

    return res.status(201).json({
      message: 'User created successfully.',
      user_id: user._id,
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({
      message: 'Error creating user',
      error: err.message,
    });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res.status(400).json({
        status: false,
        message: 'Username or email and password are required',
      });
    }

    const identifier = username || email;

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Invalid Username and password',
      });
    }

    const isMatch = await user.isPasswordMatch(password);

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: 'Invalid Username and password',
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful.',
      jwt_token: token,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      status: false,
      message: 'Login failed',
      error: err.message,
    });
  }
};
