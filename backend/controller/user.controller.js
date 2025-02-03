import { User } from "../model/user.model";

export const createAccount=async(req,res)=>{
const {fullName,email,password}=req.body;
if(!fullName||!email||!password){
    return res.status(400).json("all fields required");
}
const isUser=User.findOne({email:email});
if(isUser) return res.status(400).json("User Already existed")
const newUser=new User({
    fullName,
    email,
    password
});
await newUser.save();
return res.status(501).json("user registered successfully")

}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json("please all fields")
    }
    const userInfo=User.findOne({email:email})
    if(!userInfo){
        return res.status(400).json("user not exist");
    }
    if(userInfo.password!==password){
        return res.status(400).json("password not match");
    }
    res.status(200).json(userInfo);
}

export const getUser=async(req,res)=>{
    const {user}=req.user;
    const userInfo=User.findOne({_id:user._id})
    if(!userInfo){
        return res.status(400).json("user not exist");
    }
    if(userInfo.password!==password){
        return res.status(400).json("password not match");
    }
    res.status(200).json(userInfo);
}