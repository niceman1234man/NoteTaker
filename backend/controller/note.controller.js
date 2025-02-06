
import { Note } from "../model/note.model.js";
export const addNote=async(req,res)=>{
    const {title,content,tags}=req.body;
     const {user}=req.user;
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
        return res.json({data:note,message:"Note added syccessfully"});
    } catch (error) {
        return res.json("Internal Server Error")
    }
}
export const editNote = async (req, res) => {
    const { title, content, tags, isPinned } = req.body;
    const { id } = req.params;

    // Ensure all required fields are provided
    if (!title || !content) {
        return res.status(400).json("All fields are required");
    }

    try {
        // Update the note with new data
        const editedNote = await Note.findByIdAndUpdate(
            id,
            { title, content, tags, isPinned },
            { new: true } // This option returns the updated document
        );

        // If the note was not found, return a message
        if (!editedNote) {
            return res.status(404).json("Note not found");
        }

        return res.json({ data: editedNote, message: "Note updated successfully" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json("Internal Server Error");
    }
};

export const editPin = async (req, res) => {
    const { isPinned } = req.body;
    const { id } = req.params;

    console.log("Looking for note with ID:", id); // Debugging log

    try {
        const editedNote = await Note.findByIdAndUpdate(
            id,
            { isPinned },
            { new: true }
        );

        if (!editedNote) {
            console.log("Note not found for ID:", id); // Debugging log
            return res.status(404).json({ message: "Note not found" });
        }

        return res.json({ data: editedNote, message: "Note updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const deleteNote=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedNote=await Note.findByIdAndDelete({_id:id});
        if(!deletedNote){
            return res.json("Note not Found")
        }
        return res.json("Note deleted successfully")
    } catch (error) {
        console.log(error)
        return res.json("Internal Server Error")
      
    }

}

export const searchNote=async(req,res)=>{
    try {
         const {user}=req.user;
         const {query}=req.query;
         if (!query) {
            console.log("query not found ");
            return res.status(404).json({ message: "Query not found" });
        }
        const notes=await Note.find({userId:user._id,
        $or:[
        {title:{ $regex:new RegExp(query,"i")},
        content:{ $regex:new RegExp(query,"i")}}
        ]
        })
        return res.json({
            notes:notes,
            message:"Searched Notes"
        })
    } catch (error) {
        console.log(error)
        return res.json("Internal Server Error")
    
    }
}


export const allNotes=async(req,res)=>{
    try {
         const {user}=req.user;
        const notes=await Note.find({userId:user._id}).sort({ispinned:-1});
        return res.json({
            notes,
            message:"All Notes"
        })
    } catch (error) {
        console.log(error)
        return res.json("Internal Server Error")
    
    }
}