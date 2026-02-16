const Polls = require("../models/polls.model");
const Poll = require("../models/polls.model");
const {nanoid} = require('nanoid');

//create a poll
const createPoll = async(req,res)=>{
    try{
        const {question,options}=req.body;
        const userId = req.userId;

        const shareId = nanoid(8);

        const formattedOptions = options.map(opt => ({
            text: opt,
            votes: 0
        }));
        
        const poll = await Poll.create({
            question:question,
            options:formattedOptions,
            shareId,
            createdBy:userId,
        });

        return res.status(201).json({
            message:"Poll created successfully",
            poll,
            shareId,
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