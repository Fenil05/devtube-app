import User from "../models/User.js"

export const update = async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            {new:true}
            )

            const {password,...others} = updatedUser._doc

            res.status(200).send(others)
        } catch (err) {
            next(err)
        }
    }else{
        return next(403,"You can update only your account!")
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).send("User has been deleted!")
        } catch (err) {
            next(err)
        }
    }
    else{
        return next(createError(403,"You can delete only your account!"))
    }
}

export const getUser = (req,res,next)=>{
    
}

export const subscribe = (req,res,next)=>{
    
}

export const unsubscribe = (req,res,next)=>{
    
}

export const like = (req,res,next)=>{
    
}

export const dislike = (req,res,next)=>{
    
}