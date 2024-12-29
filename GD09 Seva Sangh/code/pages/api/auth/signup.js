// pages/api/auth/signup.js
import connectDB from '../../../utils/connectDB';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
