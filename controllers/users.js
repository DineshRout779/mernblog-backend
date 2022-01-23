const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

exports.updateUserById = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    try {
      const deleted = await Post.find({ userId: req.params.id });
      console.log(deleted);
      // await User.findByIdAndDelete(req.params.id);
      res.status(200).json('user has been deleted!');
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(404).json(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({
        error: 'No user found!',
      });
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
};
