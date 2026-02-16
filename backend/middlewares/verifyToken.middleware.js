const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;

const verifyToken = (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({message:"No token Found"});
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({ message: "Invalid token format" });
        }

        //verify Token:
        const decoded = jwt.verify(token,jwt_secret);
        req.userId = decoded.userId;
        
        next();
    }
    catch(err){
        return res.status(401).json({message:"Token invalid or expired"});
    }
}

module.exports = {verifyToken};