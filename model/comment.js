import { Schema, model } from 'mongoose';

const commentSchema = Schema({
    body:{
        type:String,
        required:true,
        trim:true
    },
    by:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    ticketId:{
        type:Schema.Types.ObjectId,
        ref:'Ticket'
    }
},{
    timestamps:true
})

export const Comment = model('Comment',commentSchema);