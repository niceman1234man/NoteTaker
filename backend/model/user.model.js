import mongoose from "mongoose";
import Password from "../../frontend/src/Components/Password";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String 
    },
    email:{
        type:String 
    },
    Password:{
        type:String 
    }
},{timestamps:true});
export const User=mongoose.model('User',userSchema);