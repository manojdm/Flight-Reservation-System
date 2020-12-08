import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler'

export const authLogin = async (req , res) => {
    const {email , password} = req.body;

    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)){
        res.json({
            name : user.name,
            _id : user._id,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        });
    } else {
        res.status(404)
        throw new Error ('User Not found'); 
    }
}

export const createUser = async (req , res) => {

    const {name , email , password} = req.body;

    const found = User.findOne({email})

    if(email && password && !found.email){
        const salt = await bcrypt.genSalt(10)

        const cryptpassword = await bcrypt.hash(password , salt);

        const user =  await User.create({ name , email, password  : cryptpassword});

        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        });
    } else {
        if(found.email) {
            res.status(404);
            throw new Error('User already exist');
        }
    }
    
}

export const getUser = asyncHandler(async (req , res) => {
    const id = req.params.id

    const user = await User.findById(id).select('-password');

    if(user){

        res.json(user);

    } else {
        throw new Error ('User not found')
    }
})

export const updateUser = async(req , res) => {
    const id = req.params.id;

    const user = await User.findById(id);

    const {name , email , password} = req.body;

    console.log(password)
    console.log(name)

    if(user){
        if(password){
            const salt = await bcrypt.genSalt(10)
            const cryptpassword = await bcrypt.hash(password , salt);

            user.name = name;
            user.email = email;
            user.password = cryptpassword;

            const updatedUser = await user.save();

            res.json({
                name : updatedUser.name,
            _id : updatedUser._id,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
            token : generateToken(updatedUser._id)
            });

            res.send('hello')
        } else {
            user.name = name;
            user.email = email;

            const updatedUser = await user.save()

            res.json({
                name : updatedUser.name,
                _id : updatedUser._id,
                email : updatedUser.email,
                isAdmin : updatedUser.isAdmin,
                token : generateToken(updatedUser._id)
            });        
        }
    }
}

export const fetchAllUsers = asyncHandler(async(req , res) => {
    const users = await User.find({}).select('-password');

    res.json(users)
})

export const deleteUser = asyncHandler(async(req , res) => {
    const id = req.params.id;

    const removeUser = await User.findByIdAndRemove(id)

    res.json({message : "User Removed"});
})

export const updateUserProfile = async(req , res) => {
    const id = req.params.id;

    const user = await User.findById(id);

    const {name , email , isAdmin} = req.body;


    if(user){
        user.name = name;
        user.email = email;
        user.isAdmin = isAdmin;

        const updatedUser = await user.save()

        res.json({
            name : updatedUser.name,
            _id : updatedUser._id,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
            token : generateToken(updatedUser._id)
        });        
    } else {
        throw new Error('User Not found')
    }
}
