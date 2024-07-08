import { Schema, model } from "mongoose";

const ticketSchema = Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    assignee:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    reporter:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    parent:{
        type:Schema.Types.ObjectId,
        ref:'Ticket'
    },
    originalEstimate:{
        type:String,
        required:true,
        default:'2d'
    },
    timeTracked:{
        type:String
    },
    priority:{
        type:String,
        required:true,
        default:'P3'
    },
    dueDate:{
        type:Date
    },
    type:{
        type:String,
        required:true,
        default:'Bug'
    },
    status:{
        type:String,
        required:true,
        default:'Ready for dev'
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }]
},{
    timestamps:true
})

export const Ticket = model('Ticket',ticketSchema);