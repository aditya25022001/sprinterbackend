import asyncHandler from 'express-async-handler';
import { Project } from '../model/project.js';

export const getAllProjects = asyncHandler(async(req,res) => {
    const projects = await Project.find({
        $or:[
            { users: { $elemMatch: { $eq: req.user._id } } },
            { admin: { $elemMatch: { $eq: req.user._id } } }
        ]
    });
    if(projects){
        res.status(200).json({
            message:"projects fetched successfully",
            projects
        })
    }
    else{
        res.status(404).json({
            message:"No projects found"
        })
    }
})

export const getProjectById = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const project = await Project.findById(id)
    .populate('users', '_id name email')
    .populate('admin', '_id name email')
    .populate({
        path:'tickets',
        populate:[
            {
                path:'assignee',
                select:'_id name email'
            },
            {
                path:'reporter',
                select:'_id name email'
            },
        ]
    })
    if(project){
        res.status(200).json({
            message:"Project fetched successfully",
            project
        })
    }
    else{
        res.status(404).json({
            message:"Project not found"
        })
    }
})

export const createProject = asyncHandler(async(req,res) => {
    const { name, users } = req.body;
    const projectExists = await Project.findOne({ name });
    if(projectExists) {
        res.status(400).json({
            message:"Project already exists"
        })
    }
    else{
        const project = await Project.create({ name, admin: req.user._id, users:[req.user._id, ...users] })
        if(project){
            res.status(201).json({
                message:'Project created successfully',
                project
            })
        }
        else{
            res.status(400).json({
                message:"Error creating project"
            })
        }
    }
})

export const mutateUsers  =asyncHandler(async(req,res) => {
    const { id, users } = req.body;
    const project = await Project.findById(id);
    if(!project){
        res.status(404).json({
            message:"Project not found"
        })
    }
    else{
        if(!req.user._id.equals(project.admin)){
            res.status(401).json({
                message:"Not authorised"
            })
        }
        else{
            project.users = users;
            const updatedProject = await project.save();
            if(updatedProject){
                res.status(201).json({
                    message:"Users updated successfully",
                    project:updatedProject
                })
            }
            else{
                res.status(500).json({
                    message:"Error updating users",
                })
            }
        }
    }
})