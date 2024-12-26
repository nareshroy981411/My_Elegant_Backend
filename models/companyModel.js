const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyEmail: { type: String, unique: true, required: true },
  companyEstablishedDate: { type: Date, required: true },
  companyRegistrationNumber: { type: String, unique: true, required: true },
  companyWebsiteLink: { type: String, required: true },
  password: { type: String, required: true },
  aboutCompany: {type: String,required: true},
  location: {type: String,required: true},
  
});

companySchema.set("versionKey", false);

module.exports = mongoose.model('Company', companySchema);
