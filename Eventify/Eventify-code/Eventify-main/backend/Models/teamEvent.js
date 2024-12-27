const mongoose = require("mongoose");

const teamEventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  minTeamSize: {
    type: Number,
    required: true,
    min: 1,
  },
  maxTeamSize: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  maxTeams: {
    type: Number,
    required: true,
    min: 1,
  },
  organizerName: {
    type: String,
    required: true,
  },
  contactMobileNo: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  registrationsCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TeamEvent", teamEventSchema);
