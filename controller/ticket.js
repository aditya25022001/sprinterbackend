import asyncHandler from 'express-async-handler'
import { Ticket } from '../model/ticket.js'
import { Project } from '../model/project.js'

export const createTicket = asyncHandler(async(req,res) => {
    const { title, owner, description, assignee, parent, originalEstimate, timeTracked, dueDate, type } = req.body;
    const project = await Project.findById(req.params.id);
    if(project){
        const ticket = await Ticket.create({
            title, 
            description, 
            owner, 
            assignee: assignee || project.admin,
            parent, 
            originalEstimate, 
            timeTracked, 
            dueDate, 
            type, 
            reporter: req.user._id
        })
        project.tickets.push(ticket._id);
        const updatedProject = await project.save();
        if(updatedProject){
            res.status(201).json({
                message:"Ticket created successfully",
                ticket
            })
        }
        else{
            res.status(400).json({
                message:"Error creating project"
            })
        }
    }
    else{
        res.status(404).json({
            message:"Project not found"
        })
    }
})

export const getTicketById = asyncHandler(async(req,res) => {
    const id = req.params.id;
    try{
        const ticket = await Ticket.findById(id)
        .populate('owner', '_id name email')
        .populate('assignee', '_id name email')
        .populate('reporter', '_id name email')
        .populate({
            path:'comments',
            populate:{
                path:'by',
                select:'_id name email'
            }
        });
        if(ticket){
            res.status(200).json({
                message:'ticket fetched successfully',
                ticket
            })
        }
        else{
            res.status(404).json({
                message:"ticket not found"
            })
        }
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})