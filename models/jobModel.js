// Job.js (Model)

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    qualification:[{
        type: String 
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel:{
        type:Number,
        required:true,
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
},{timestamps:true});
const Job = mongoose.model("Job", jobSchema);
module.exports = Job;









// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   company: String,
//   location: String,
//   postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// });

// module.exports = mongoose.model('Job', jobSchema);


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
