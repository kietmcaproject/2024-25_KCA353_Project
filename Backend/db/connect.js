const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectDB = (url) => {
  return mongoose.connect(url, {
    tls: true,
    // tlsAllowInvalidCertificates: false, // if needed, ensure certificates are valid
    // tlsInsecure: false, // ensure connection is secure
  });
};

module.exports = connectDB;
 