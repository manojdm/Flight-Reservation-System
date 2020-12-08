import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req , res , next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token , '123456');

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('not authorized');
        }
    }
})

export const admin = asyncHandler(async(req , res , next) => {
    const user = req.user;

    if(user.isAdmin) {
        next();
    }
    else {
        throw new Error('User is not admin')
    }
})