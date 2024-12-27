const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
  },
  date: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  location: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  organizerName: {
    type: String,
  },
  contactMobileNo: {
    type: Number,
  },
  contactEmail: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  registrationsCount: {
    type: Number,
    default: 0, // Initializes with 0 registrations
  },
});

module.exports = mongoose.model("Event", eventSchema);
