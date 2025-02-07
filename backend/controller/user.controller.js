import { User } from "../model/user.model.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const createAccount=async(req,res)=>{
const {fullName,email,password}=req.body;
if(!fullName||!email||!password){
    return res.status(400).json("all fields required");
}
const isUser=await User.findOne({email:email});
if(isUser) return res.status(400).json("User Already existed")
const newUser=new User({
    fullName,
    email,
    password
});
await newUser.save();
const accessToken=jwt.sign({newUser},process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:"36000m"
})
return res.status(201).json({error:false,accessToken,message:"user registered successfully"})

}
export const login=async(req,res)=>{
    try {
        
   
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json("please all fields")
    }
    const userInfo=await User.findOne({email:email})
    if(!userInfo){
        return res.status(400).json("user not exist");
    }
    if(userInfo.password!==password){
        return res.status(400).json("password not match");
    }
    const user={user:userInfo}
    const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"36000m"
    })
    res.status(200).json({email,accessToken,meaage:"Login Successfully"});
} catch (error) {
  console.log(error)      
}
}

export const getUser = async (req, res) => {
    try {
        const { user } = req.user; 
        const userInfo = await User.findOne({ _id: user._id }); // Await the promise

        if (!userInfo) {
            return res.status(400).json({ message: "User does not exist" });
        }

        res.status(200).json({user:userInfo});
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Server error" });
    }
};