import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';

export const authenticate = asyncHandler(async(req,res, next) => {
    let token;
    if(req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.decode(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
        }
        catch(error){
            res.status(401).json({
                message:"Token failed, sign in again"
            });
        }
    }
    if(!token){
        res.status(401).json({
            message:"Not authorised"
        });
    }
    next();
})