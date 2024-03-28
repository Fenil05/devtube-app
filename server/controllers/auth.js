import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'

export const signup = async(req,res,next)=>{
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password,10)
        const newUser = new User({
            ...req.body,
            password:hashedPassword
        })
        await newUser.save()
        res.status(200).send("User has been created!")
    } catch (err) {
        next(err)
    }
}