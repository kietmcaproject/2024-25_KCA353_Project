const express = require('express')
const SignUpRouter = express.Router();
const User = require('../model/User')
const jwt =  require('jsonwebtoken')
const bcrypt = require('bcrypt')


SignUpRouter.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exist"});
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        const user = new User({
            username, 
            email, 
            password: hashedPassword
        });  
            
        console.log("User data is to be saved.");
        await user.save();

        //Generate JWT Tokens
        const payload = {
            user: {
                id: user._id
            }
        }
        const secretkey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretkey, {expiresIn: '1h'});
        
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000 * 24 // 1 day
        })
        res.status(201).json({token, message: "User Created Successfully"})

    } catch (error) {
        if(error.name === 'JsonWebTokenError') {
            res.status(401).json({message: 'Invalid token'})
        } else if (error.name === 'BcryptError'){
            res.status(500).json({message: 'Error in hashing password'})
        } else {
            res.status(500).json({message: 'Error creating user'})
        }
    }
})

module.exports = SignUpRouter