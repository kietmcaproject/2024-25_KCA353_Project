const mongoose = require('mongoose');

const AddressSchema = {
  street: String,
  city: String,
  state: String,
  postalcode: String,
  country: String,
};

const userSchema = new mongoose.Schema({
  name: String,
  mobileno: String,
  email: String,
  username: String,
  password: String,
  profilePicture: String,
  address: AddressSchema,
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
