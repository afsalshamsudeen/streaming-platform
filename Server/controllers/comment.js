import Video from "../Models/Video.js";
import Comment from "../Models/Comments.js"

export const addComment = async (req,res,next)=>{
    const newComment = new Comment({...req.body, userId:req.user.id})
    try{
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    }catch(err){

        next(err);
    }
}
export const deleteComment = async (req,res,next)=>{
    try{
        const comment = await Comment.findById(res.params.id)
        const video = await Video.findById(res.params.id)
        if(req.userId === comment.userId || req.user.id === video.userId){
            await Comment.findByIdDelete(req.params.id)
            res.status(200).json("The comment is deleted")
        }else{
            return next(403, "You can delete only your comment")
        }
    }catch(err){
        
        next(err)
    }
}
export const getComments = async (req,res,next)=>{
    try{
        const comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comments) 
    }catch(err){
        
        next(err)
    }
}