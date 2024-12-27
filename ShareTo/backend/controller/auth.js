const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User_model = require('../Models/UserSchema');

const login = async(req,res) => {
    try{
        console.log(req.body);
        const {username , password} = req.body;
        const user = await User_model.findOne({username , password});
        if(user){
            return res.status(200).json({
                'success': true,
                'message' : 'user authenticated',
                'access' : true,
                'UserData' : user
            })
        }else{
            return res.status(400).json({
                'success': false,
                'message' : 'user not found',
                'access' : false,
                'UserData' : user
            })
        }   
    }catch(e){
        return res.status(404).json({
            'success': false,
            'message' : 'Sonething went wrong',
            'access' : false,
            'error' : e.message
        })
    }
}

const signup  = async(req,res) => {
    try{
        console.log(req.body);
        const {username, name , password, phoneNumber} = req.body;
        const user = await User_model.create({username, name , password , phoneNumber});
        if(user){
            return res.status(200).json({
                'success': true,
                'message' : 'user Registered',
                'access' : true,
                'UserData' : user
            })
        }else{
            return res.status(400).json({
                'success': false,
                'message' : 'user not Registered',
                'access' : false,
                'UserData' : user
            })
        }   
    }catch(e){
        return res.status(404).json({
            'success': false,
            'message' : 'Sonething went wrong Backend Error',
            'access' : false,
            'error' : e.message
        })
    }
}


module.exports = {login , signup};