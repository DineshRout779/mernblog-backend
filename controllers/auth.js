const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      status: false,
      error: 'All fields are required',
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: false,
        error: 'User exists!',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json('User registered successfully!');
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        status: false,
        error: `User doesnt't exists!`,
      });
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(400).json({
        status: false,
        error: `Wrong credentials!`,
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });
  } catch (error) {
    res.status(500).json(error);
  }
};
