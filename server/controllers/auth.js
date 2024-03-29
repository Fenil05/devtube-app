import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { createError } from "../error.js"
import jwt from "jsonwebtoken"

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

export const signin = async(req,res,next)=>{
    try {
        const user = await User.findOne({name:req.body.name})

        if(!user){
            return next(createError(404,"User not found!"))
        }

        const hashedPassword = bcrypt.compareSync(req.body.password,user.password)

        if(!hashedPassword){
            return next(createError(404,"User not found!"))
        }

        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SEC)

        const {password,...others} = user._doc

        res.status(200).cookie("accessToken",token,{
            httpOnly:true
        }).send(others)

    } catch (err) {
        next(err)
    }
}

export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SEC);
        res
          .cookie("accessToken", token, {
            httpOnly: true,
          })
          .status(200)
          .json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SEC);
        res
          .cookie("accessToken", token, {
            httpOnly: true,
          })
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
  };