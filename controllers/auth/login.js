const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.status === 'inactive') {
            return res.status(403).json({ message: "Account Inactive" });
        }

        const isMatch = password === user.password;
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
        res.json({ message: "Login Successful", token })

    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
}

module.exports = {login};