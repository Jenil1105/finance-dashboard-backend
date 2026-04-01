const User = require("../../models/user");

const updateUser = async (req, res)=>{
    try{
        const {id} = req.params;
        const {name, email, password, role, status} = req.body;

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }

        if(name) user.name = name;
        if(email) user.email = email;
        if(password) user.password = password;
        if(role) user.role = role;
        if(status) user.status = status;

        await user.save();

        res.status(200).json({message:"user updated successfully"});
    }catch(err){
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {updateUser};