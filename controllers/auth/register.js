const User = require("../../models/user.model");

const register = async(req, res)=>{
    try{
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields required' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const user = await User.create({
            name,
            email,
            password,
        })

        res.status(201).json({
            message: "User created successfully!!",
            userId: user._id
        })

    }catch(err) {
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

module.exports = {register};