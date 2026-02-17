const mongoose = require('mongoose');
const {Schema} = mongoose;

const votesSchema = new Schema({
    poll_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Polls',
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    option_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    device_id:{
        type:String,
    },
    
},{timestamps:true});

const Votes = mongoose.model('Vote',votesSchema);

module.exports = Votes;