const Polls = require("../models/polls.model");
const Votes = require("../models/votes.model");

// vote an option

const vote = async(req,res)=>{
    try{
        const {poll_id,option_id} = req.body;
        const user_id = req.userId;
        const ipAddress = req.ip;
        
        const existing = await Votes.findOne({
            poll_id,
            $or:[
                {user_id},
                {ipAddress}
            ]
        });

        if(existing){
            return res.status(401).json({message:"You have already voted"});
        }

        const voted = await Votes.create({
            poll_id,
            option_id,
            user_id,
            ipAddress
        });

        await Polls.updateOne(
            {_id:poll_id, "options._id":option_id},
            {$inc:{"options.$.votes": 1}}
        );
        
        const updatedPoll = await Polls.findById(poll_id);
        const io = req.app.get("io");
        // io.to(updatedPoll.shareId).emit("pollUpdated",updatedPoll);
        io.to(updatedPoll.shareId).emit("voteUpdated", {
            options: updatedPoll.options
        });

        return res.status(200).json({
            message:"User voted successfully",
            poll:updatedPoll
        });

    }catch(err){
        return res.status(500).json({message:"Voting failed"});
    }
}

module.exports = {vote};