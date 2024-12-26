const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URI).on;
};

module.exports = { dbConnect };
