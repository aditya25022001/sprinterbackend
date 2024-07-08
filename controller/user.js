import { User } from '../model/user.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../config/token.js'

export const register = asyncHandler(async(req,res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400).json({
            message:"User already exists"
        });
    }
    else{
        const user = await User.create({ name, email, password });
        if(user){
            res.status(201).json({
                message:"User registered successfully",
                success:true
            });
        }
        else{
            res.status(400).json({
                message:"Invalid Data"
            })
        }
    }
})

export const login = asyncHandler(async(req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        res.status(404).json({
            message:"User not found"
        });
    }
    else{
        if(await user.matchPassword(password)){
            res.status(200).json({
                message:"Logged in successfully",
                id: user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            })
        }
        else{
            res.status(401).json({
                message:"Invalid password"
            })
        }
    }
})

export const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({});
    if(users){
        res.status(200).json({
            message:"Users fetched successfully",
            users
        });
    }
    else{
        res.status(500).json({
            message:"Error fetching users"
        });
    }
})