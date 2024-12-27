const mongoose = require("mongoose");

const RegistrationSchema = {
  user_id: {
    type: "ObjectId",
    ref: "User", // References the Users collection
    required: true,
  },
  event_id: {
    type: "ObjectId",
    ref: "Event", // References the Events collection
    required: true,
  },
  registration_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
};

// Export the model
module.exports = mongoose.model("Registration", RegistrationSchema);
