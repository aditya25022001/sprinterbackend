import asyncHandler from 'express-async-handler'
import { Comment } from '../model/comment.js'
import { Ticket } from '../model/ticket.js'

export const addComment = asyncHandler(async(req,res) => {
    const { body } = req.body;
    const id = req.params.id;
    try{
        const ticket = await Ticket.findById(id);
        if(ticket){
            const comment = await Comment.create({ body, ticketId:id, by:req.user._id });
            if(comment){
                ticket.comments.push(comment._id);
                const updatedTicket = await ticket.save();
                if(updatedTicket){
                    res.status(201).json({
                        message:"comment added successfully",
                        comment
                    })
                }
            }
        }
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})