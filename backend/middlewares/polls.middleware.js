const Poll = require("../models/polls.model");

const validatePoll = (req,res,next)=>{
    const {question,options} = req.body;
    
    // check if question is undefined as well as only contains space
    if(!question || question.trim===""){
        return res.status(400).json({message:"Question is required"});
    }
    if(options.length <2 || options.length>6){
        return res.status(400).json({message:"Options must be between 2 and 6"});
    }

    for(let opt of options){
        if(!opt || opt.trim()===""){
            return res.status(400).json({message:"Each option must have a text"});
        }
    }
    next();
}

module.exports = validatePoll;