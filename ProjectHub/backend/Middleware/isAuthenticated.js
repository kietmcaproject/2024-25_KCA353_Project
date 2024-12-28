const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.headers['token'];
        jwt.verify(token, process.env.MY_SECRET_KEY, async(err, user_id)=>{
            // console.log(user_id.id);
            try {
                const user =await User.findOne({_id: user_id.id});
                if(user){
                    next();
                }else{
                    return res.status(400).json({
                        success:"false",
                        message:"Login first in order to access the resource"
                });
                }
                
            } catch (error) {
                return res.status(400).json({
                    success:"false",
                    message:"Login first in order to access the resource"
            })
                // console.log(error.message)
            }
        });
    } catch (error) {
        // console.log(error.message);
        return res.status(400).json({
            success:"false",
            message:"Invalid User token not found or expired"
    })
    }

}

module.exports = {
    isAuthenticated
}