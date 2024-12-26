const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalcode: String,
  country: String,
});

const recipientSchema = new mongoose.Schema({
  toServe: Number,
  category: String,
  description: String,
  addressFrom: AddressSchema,
  addressTo: AddressSchema,
  date: Date,
  completed: Boolean,
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Recipients = mongoose.model('Recipients', recipientSchema);

module.exports = { Recipients }