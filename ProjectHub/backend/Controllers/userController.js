const User = require('./../Models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupController = async (req,res)=>{
    try {
        const data = req.body;
        // console.log(req.body);
        const encryptedPass = await bcrypt.hash(data.password, 12);
        data.password=encryptedPass

        // console.log(data);
        const user =  new User(data);
        await user.save();

        res.status(200).json({
            success:"true",
            message:"Successfully SignUp!",
            user:data
        })
    } catch (error) {
        if((error.message).search("E11000")!=-1){
            res.status(400).json({
                success:"false",
                message:"Enter unique email !!!"
            })
        }
        else {
        res.status(400).json({
            success:"false",
            message:`Error: ${error.message}`
        })}
        // console.log(error+"while creating user");
    }
}

const loginController = async (req,res)=>{
    try {
        console.log("hello in login controller");
        
        const data =req.body;
        const user = await User.findOne({email:data.email});
        if(user){
            const isMatch = await bcrypt.compare(data.password, user.password);
            console.log(isMatch);
            if(isMatch){
                // console.log("valid user")
                const token = jwt.sign({id: user.id}, process.env.MY_SECRET_KEY, { expiresIn: 60 * 60 *24 *10 });
                res.status(200).json({
                    success:"true",
                    message:"Login Successfull",
                    user,token
                })
            }else{
                res.status(400).json({
                    success:"false",
                    message:"Invalid Email or Password"
                })
            }
        }else{
            res.status(400).json({
                success:"false",
                message:"Invalid Email or Password"
            })
        }

        //  const isMatch = await bcrypt.compare(data.password, e)

    } catch (error) {
        res.status(400).json({
            success:"false",
            message:`Error: ${error.message}`
        })
    }
}


module.exports = {
    signupController,
    loginController
}