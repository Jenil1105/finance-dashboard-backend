const User = require("../../models/user.model");

const getAllUsers = async (req, res)=>{
    try{        
        const users = await User.find({});

        res.status(200).json({users});
    }catch(err){
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {getAllUsers};