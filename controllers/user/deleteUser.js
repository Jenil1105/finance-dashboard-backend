const User = require("../../models/user.model");

const deleteUser = async (req, res)=>{
    try{
        const {id} = req.params;

        //safety check - admin can not delete itself
        if (req.user.id === id) {
            return res.status(400).json({ message: 'Cannot delete yourself' })
        }
        
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }

        res.status(200).json({message:"user deleted successfully"});
    }catch(err){
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {deleteUser};