import mongoose from "mongoose";
const noteSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
       
    },
    isPinned:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const Note=mongoose.model("Note",noteSchema);