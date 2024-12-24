// adminController.js
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};