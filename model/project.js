import { Schema, model } from 'mongoose';

const projectSchema = Schema({
    name:{
        type:String,
        requierd:true,
        unique:true
    },
    users:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    tickets:[{
        type:Schema.Types.ObjectId,
        ref:'Ticket'
    }],
    admin:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

export const Project = model('Project',projectSchema);