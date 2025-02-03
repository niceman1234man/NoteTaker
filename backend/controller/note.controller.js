
import { Note } from "../model/note.model";
export const addNote=async(req,res)=>{
    const {title,content,tags}=req.body;
    const user=req.user;
    if(!title||!content){
        return res.status(400).json("all fileds required");
    }
    try {
        const note=new Note({
            title,
            content,
            tags:tags||[],
            userId:user._id,

        });
        await note.save();
        return res.json("Note added syccessfully");
    } catch (error) {
        return res.json("Internal Server Error")
    }
}
export const editNote=async(req,res)=>{
    const {title,content,tags,ispinned}=req.body;
    const user=req.user;
    if(!title||!content){
        return res.status(400).json("all fileds required");
    }
    try {
        const note=new Note({
            title,
            content,
            tags:tags,
            isPinned

        });
        const editedNote=await Note.findByIdAndUpdate({_id:noteId,note})
        if(!editNote) return res.json("Note note Found")
        return res.json("Note Updated syccessfully");
    } catch (error) {
        return res.json("Internal Server Error")
    }
}
export const deleteNote=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedNote=Note.findByIdAndDelete({_id:id});
        if(!deleteNote){
            return res.json("Note not Found")
        }
        return res.json("Note deleted successfully")
    } catch (error) {
        return res.json("Internal Server Error")
        console.log(error)
    }

}

export const allNotes=async(req,res)=>{
    try {
        const {user}=req.user;
        const notes=await Note.find({userId:user._id}).sort({ispinned:-1});
        return res.json({
            note,
            message:"All products"
        })
    } catch (error) {
        return res.json("Internal Server Error")
        console.log(error)
    }
}