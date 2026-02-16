const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;

const signUp = async(req,res)=>{
    try{
        // user details:
        const {name,email,password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User created",
        })
    }
    catch(err){
        console.log("User creation Failed",err);
        return res.status(500).json({error: err.message});
    }
}

const signIn = async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({msg: "User Not Found"});
    }

    // password match
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({msg: "Invalid Credentials"});
    }

    const token = jwt.sign(
        {userId: User._id},
        jwt_secret,
        {expiresIn: "7d"}
    )

    return res.json({token});
    
}

module.exports = {signUp,signIn};