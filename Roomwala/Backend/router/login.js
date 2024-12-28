import express from 'express';
import 'dotenv/config';
import User from '../models/user.js';
import { login,optverification, userInfo ,updateuser, updatepassword} from '../controller/userController.js';
import {redis} from '../controller/redisClient.js';

const router = express.Router();

function generateOTP(limit) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

router.post('/signup', async (req, res) => {
    // console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ success: false, message: 'Please fill all the fields' });
    }
    if (req.body.password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password should be atleast 6 characters' });
    }
    let usercheck = await User.findOne({ email: req.body.email });
    // console.log(usercheck);
    if (usercheck) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    };
    new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).save();
    let otp = generateOTP(4);
    await redis.setex(`otp:${req.body.email}`,660, JSON.stringify({ email: req.body.email, otp: otp }));
    // send email
        let otpresponse = await fetch(`https://shop.nitishjha.in.net/otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: req.body.email, otp: otp })
        }
        );
        let response = await otpresponse.json();
        // console.log(response);
    res.status(201).json({ success: true, message: 'Verification Otp Sent successfully' });
});

router.post('/otpverification', optverification);

router.post('/login', login);

router.post('/userinfo', userInfo);

router.post('/update', updateuser);

router.post('/updatepassword', updatepassword);

router.post('/forgot-password', async (req, res) => {
    if (!req.body.email) {
        return res.status(400).json({ success: false, message: 'Please enter email' });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Email not found' });
    }
    let otp = generateOTP(4);
    await redis.setex(`otp:${req.body.email}`,660, JSON.stringify({ email: req.body.email, otp: otp }));
    // send email
    let otpresponse = await fetch(`https://shop.nitishjha.in.net/otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: req.body.email, otp: otp })
    }
    );
    let response = await otpresponse.json();
    // console.log(response);
    res.status(200).json({ success: true, message: 'Password reset link sent to your email' });
}
);

router.post('/verify-otp', async (req, res) => {
    if (!req.body.email || !req.body.otp) {
        return res.status(400).json({ success: false, message: 'Please enter email and otp' });
    }
    let otp = await redis.get(`otp:${req.body.email}`);
    if (!otp) {
        return res.status(400).json({ success: false, message: 'OTP expired' });
    }
    otp = JSON.parse(otp);
    if (otp.otp !== req.body.otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    res.status(200).json({ success: true, message: 'OTP verified' });
});

router.post('/reset-password', async (req, res) => {
    if (!req.body.email || !req.body.newPassword) {
        return res.status(400).json({ success: false, message: 'Please enter email and new password' });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Email not found' });
    }
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({ success: true, message: 'Password changed successfully' });
});


export default router;