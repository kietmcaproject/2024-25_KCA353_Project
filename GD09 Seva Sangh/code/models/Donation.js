
import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String, required: false },
  },
  { timestamps: true }
);

const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);

export default Donation;
