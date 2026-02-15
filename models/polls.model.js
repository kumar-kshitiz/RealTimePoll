const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const {Schema} = mongoose;

const pollsSchema = new Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    question:{
        type:String,
        required:true,
    },
    options:{
        type:[{
            text:{
                type:String,
                required:true,
            },
            votes:{
                type:Number,
                default:0,
            }
        }],
        validate:[optLimit, 'options limit must be between 2 and 6']
    },
    shareId:{
        type:String,
        unique:true,
        default: ()=> nanoid(8),
    }
},{timestamps:true});

function optLimit(val){
    return val.length>=2 && val.length<=4;
}

const Polls = mongoose.model('Polls',pollsSchema);

module.exports=Polls;