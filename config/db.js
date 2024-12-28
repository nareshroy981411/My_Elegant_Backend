const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://manilaveti321:YHjxOyIWlntjyd5y@cluster0.dgvsl.mongodb.net/");
    // await mongoose.connect("mongodb://localhost:27017/");
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;