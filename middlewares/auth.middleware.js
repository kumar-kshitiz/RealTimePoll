const User = require("../models/user.model");

const validateSignup = async(req,res,next)=>{

    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(401).json({message:"User already exits"});
    }

    next();
}

const validateSignin = async(req,res,next)=>{

    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    next();
}

module.exports = {validateSignup,validateSignin};