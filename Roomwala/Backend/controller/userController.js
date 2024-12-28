import User from '../models/user.js';
import 'dotenv/config';
import bcrtpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { redis } from './redisClient.js';

const login = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (!user) {
        return res.status(404).json({ success: false, message: 'invaid credentials' });
    }
    else {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '365d',
        });
        return res.status(200).json({ success: true, token: token });
    }
};

let optverification = async (req, res) => {
    if (!req.body.email || !req.body.otp) {
        return res.status(400).json({ success: false, message: 'Please fill all the fields' });
    }
    let usercheck = await User.findOne({ email: req.body.email });
    if (!usercheck) {
        return res.status(400).json({ success: false, message: 'User does not exist' });
    };
    let otpobj = await redis.get(`otp:${req.body.email}`);
    let otpobj1 = JSON.parse(otpobj);
    let otp = otpobj1.otp;
    if (otp === req.body.otp) {
        usercheck.isVarified = true;
        usercheck.save();
        return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
        return res.status(400).json({ success: false, message: 'OTP verification failed' });
    }
};

let userInfo = async (req, res) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ success: false, message: 'Invalid User' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const emailtoken = decoded.email;
        let user = await User.findOne({ email: emailtoken });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        let { name, email, _id,contactNo, address, pincode, prfilepic, createdAt, updatedAt } = user;
        res.status(200).json({ success: true,_id, name, email, contactNo, address, pincode, prfilepic, createdAt, updatedAt });
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid User' });
    }
};

let updateuser = async (req, res) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ success: false, message: 'Invalid User' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const emailtoken = decoded.email;
        let user = await User.findOne({ email: emailtoken });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.contactNo) {
            user.contactNo = req.body.contactNo;
        }
        if (req.body.address) {
            user.address = req.body.address;
        }
        if (req.body.pincode) {
            user.pincode = req.body.pincode;
        }
        if (req.body.prfilepic) {
            user.prfilepic = req.body.prfilepic;
        }
        await user.save();
        res.status(200).json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid User' });
    }
}

const updatepassword = async (req, res) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ success: false, message: 'Invalid User' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const emailtoken = decoded.email;
        let user = await User.findOne({ email: emailtoken });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (req.body.currentPassword !== user.password) {
            return res.status(400).json({ success: false, message: 'Invalid User credentials' });
        }
        if (req.body.newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'Password should be atleast 6 characters' });
        }else{
            user.password = req.body.newPassword;
            await user.save();
            res.status(200).json({ success: true, message: 'Password updated successfully' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid User' });
    }
};


export { login, optverification, userInfo ,updateuser,updatepassword};