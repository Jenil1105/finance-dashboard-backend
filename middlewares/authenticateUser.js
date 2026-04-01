const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message: "no token provided"});
        }

        const token = authHeader
        const decoded = jwt.verify(token,JWT_SECRET);

        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message:"invalid token"});
    }
}

module.exports = {authenticateUser};