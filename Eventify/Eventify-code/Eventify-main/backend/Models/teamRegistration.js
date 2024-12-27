const mongoose = require("mongoose");

const teamRegistrationSchema = new mongoose.Schema({
  event_id: {
    type: "ObjectId",
    ref: "TeamEvent",
    required: true,
  },
  user_id: {
    type: "ObjectId",
    ref: "User",
    required: true,
  },
  teamName: {
    type: String,
  },
  teamMembers: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      course: { type: String, required: true },
      branch: { type: String, required: true },
    },
  ],
  teamLeader: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TeamRegistration", teamRegistrationSchema);
