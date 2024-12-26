const mongoose = require('mongoose');

const AddressSchema = {
  street: String,
  city: String,
  state: String,
  postalcode: String,
  country: String,
};

const donationSchema = new mongoose.Schema({
  serves: Number,
  category: String,
  description: String,
  addressFrom: AddressSchema,
  addressTo: AddressSchema,
  date: Date,
  completed: Boolean,
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Donations = mongoose.model('Donations', donationSchema);

module.exports = { Donations }