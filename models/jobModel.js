// Job.js (Model)
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
 
module.exports = mongoose.model('Job', jobSchema);


// // Job.js (Model)
// const mongoose = require("mongoose");

// // Define the job schema
// const jobSchema = new mongoose.Schema({
//   companyName: {
//     type: String,
//     required: true,
//   },
//   companyEmail: {
//     type: String,
//     required: true,
//     match: [/\S+@\S+\.\S+/, "Please use a valid email address"], 
//   },
//   companyEstablishedDate: {
//     type: Date,
//     required: true,
//   },
//   companyRegistrationNumber: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   companyWebsiteLink: {
//     type: String,
//     required: true,
//   },
//   aboutCompany: {
//     type: String,
//     required: true,
//   },
//   postedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// jobSchema.set("versionKey", false);

// // Add an index on `companyName` for better query performance
// jobSchema.index({ companyName: 1 });

// module.exports = mongoose.model("Job", jobSchema);
