const auth_model = require("../models/auth_model.js")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const register = async (req,res)=>{
    try {
        const {username, email, password} = req.body

        const user = await auth_model.findOne({email})

        if(user){
            return res.status(500).json({message:"this email already exist"})
        }

        if(password.length < 6){
            return res.status(500).json({message:"your password cannot be less than 6 characters"})
        }

        const passwordHash = await bcrypt.hash(password,12)

        const newUser = await auth_model.create({username,email,password: passwordHash})

        const userToken = await jwt.sign({id:newUser.id},process.env.SECRET_TOKEN,{expiresIn:"1h"})

        res.Status(201).json({
            status:"OK",
            newUser,
            userToken
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

const login =   async(req,res) =>{
    try {
        const {email, password} = req.body
        const user = await auth_model.findOne({email})

        if(!user){
            return res.status(500).json({message:"user not found...."})
        }
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            return res.status(500).json({message:"wrong password"})
        }

        const token = jwt.sign({id: user.id},process.env.SECRET_TOKEN,{expiresIn:"1h"})

        res.status(200).json({
            status:"OK",
            user,
            token
        })

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    register,login
}