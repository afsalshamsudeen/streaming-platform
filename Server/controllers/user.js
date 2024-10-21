import { createError } from "../error.js";
import User from "../Models/User.js";
export const update = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            }, 
            {new:true});

            res.status(200).json(updatedUser)

        }
        catch{
            next(err)
        }
    }else{
        return next(createError(403, "You can update only your account!"))
    }
    
}
export const deleteUser = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndDelete(
                req.params.id,


            
            );
            
            res.status(200).json("User hasbeen deleted")

        }
        catch{
            next(err)
        }
    }else{
        return next(createError(403, "You can delete only your account!"))
    }
    
}
export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req, params.id)
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
    
    
}
export const subscriber = async (req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{ subscribers: 1},

        });
        res.status(200).json("subscription successful!")
    }
    catch(err){
        next(err)
    }
    
}
export const unSubscribe = async (req,res,next)=>{
    try{
        try{
            await User.findByIdAndUpdate(req.user.id,{
                $pull:{subscribedUsers:req.params.id}
            })
            await User.findByIdAndUpdate(req.params.id,{
                $inc:{ subscribers: -1},
    
            });
            res.status(200).json("unsubscription successful!")
        }
        catch(err){
            next(err)
        }
    }
    catch(err){
        next(err)
    }
    
}
export const like = async (req,res,next)=>{
    try{

    }
    catch(err){
        next(err)
    }
    
}
export const disLike = async (req,res,next)=>{
    try{

    }
    catch(err){
        next(err)
    }
    
}