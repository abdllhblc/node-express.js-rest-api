const PostSchema = require("../models/post_model.js")

const createPost = async(req,res)=>{
    try {
        const newPost = await PostSchema.create(req.body)
        res.status(201).json({
            newPost
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const getPosts = async(req,res)=>{

    try {
        const getposts = await PostSchema.find(req.body)
        res.status(201).json({
            getposts
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}


const getDetail = async(req,res)=>{
    try {

        const {id} = req.params;
        const detailPost = await PostSchema.findById(id)
        res.status(200).json({
            detailPost
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const updatePost = async(req,res)=>{
    try {

        const {id} = req.params;
        const updatedPost = await PostSchema.findByIdAndUpdate(id,req.body,{ new:true})
        res.status(200).json({
            updatedPost
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deletePost = async(req,res)=>{
    try {
        const {id} = req.params;
        await PostSchema.findByIdAndRemove(id)
        res.status(201).json({
            message:"deletion successful"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const searchPosts = async(req,res)=>{
    const {search ,tag} = req.query
    
    try {
        const title = new RegExp(search,"i")
        const posts = await PostSchema.find({$or: [{title}], tag:{$in: tag.split(",")}})

        res.status(200).json({
            posts
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    createPost,
    getDetail,
    getPosts,
    updatePost,
    deletePost,
    searchPosts
}