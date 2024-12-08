const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcryptjs");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please prove your name."],
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Please provide yur phone number."],
  },
  shopName: {
    type: String,
    required: [true, "Shop name must required."],
  },
  password: {
    type: String,
    requred: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  address: {
    type: String,
    required: [true, "Please provide the address."],
    maxlength: 100,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
