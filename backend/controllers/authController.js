const User=require('../modules/userModule.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_JWT= process.env.SECRET_JWT  || "87gscc2zahsms";
async function registerUser(req,res){
    let {firstName,lastName,userName,email,password}=req.body;
    try{
        const duplicate= await User.find({userName});
        if(duplicate && duplicate.length>0) {
            return res.status(400).send({message:'USer already exits with this UserName.'})
        }
        let user= new User({firstName,lastName,userName,email,password});
        const result = await user.save();
        console.log(result);
        res.status(201).send({message:'USer Registered successfully'});
    } catch(err)
{
    console.log(err);
    res.status(400).send(err);
}    
}

async function loginUser(req,res){
    let {userName,password}=req.body;
    try{

        const {userName,password}= req.body;
        const user =await User.findOne({userName});
        if(!user){
            return res.status(404).send({message:"Authentication Failed!!"});

        }
        const isPasswordValid= await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(404).send({message:"Entered Wrong Password!"});
        }
        let token = await jwt.sign({userId:user?._id},SECRET_JWT,{expiresIn:'1h'});
        let finalData ={
            userId:user?._id,
            userName:user?.userName,
            firstName:user?.firstName,
            lastName:user?.lastName,
            token
        }
        res.send(finalData);
    
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

const AuthController={
    registerUser,
    loginUser,

}

module.exports=AuthController;