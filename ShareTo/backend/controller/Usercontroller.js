const user_model = require("../Models/UserSchema");

const Getuser = async(req,res) => {
    try{    
        const id = req.query.id.toString();
        console.log("Id is : " , id);
        const user = await user_model.findById(id);
        console.log("user is : ", user)
        if(user){
            return res.status(200).json({
                status: 1,
                message: "User Found",
                User: user,
            })
        }else{
            console.log("User not is database");
            return res.status(400).json({
                status: 0,
                message: "USer not found",
            })
        }
    }catch(e){
        console.log("Error occured in fetching user " , e);
        return res.status(500).json({
            status: 0,
            message: "User not found inside catch",
            error: e.message
        });
    }
}

module.exports = {Getuser};