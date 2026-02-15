const Poll = require("../models/polls.model");

//create a poll
const createPoll = async(req,res)=>{
    try{
        const {question,options}=req.body;
        const userId = req.userId;

        const poll = await Poll.create({
            question:question,
            options:options,
            createdBy:userId,
        });

        return res.status(201).json({
            message:"Poll created successfully",
            poll
        });
        
    }catch(err){
        console.log("Poll Creation failed",err);
        return res.status(500).json({message:"Poll creation failed"});
    }
}

// get Poll by shareId
const getPoll = async(req,res)=>{
    try{
        const shareId = req.params.shareId;
        const poll = await Polls.findOne({shareId});
        res.json(poll);
    }catch(err){
        return res.status(500).json({message:"Error in fetching poll"});
    }
};

module.exports = {createPoll,getPoll};