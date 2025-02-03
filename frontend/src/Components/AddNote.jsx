import React, { useState } from "react";
import TagInput from "./TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
function AddNote({noteData,type,getAllNotes,onClose}) {
  const [title, setTitle] = useState(noteData?.title||"");
  const [content, setContent] = useState(noteData?.content||"");
  const [error, setError] = useState("");
  const [tags, setTags] = useState(noteData?.tags||[]);

  const addNewNote=async()=>{
    try {
      const response=await axiosInstance.post('/add-note',{
        title,
        content,
        tags
      });
      if(response.data && response.data.note){
        getAllNotes();
        onClose();

      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
    }
  }
  const editNote=async()=>{
    const noteId=noteData._id;
    try {
      const response=await axiosInstance.put('/edit-note/'+noteId,{
        title,
        content,
        tags
      });
      if(response.data && response.data.note){
        getAllNotes();
        onClose();

      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
    }
  }
  const handleNote=()=>{
if(!title||!content){
    setError("please Fill All Fields")
    return;
}
setError("");
if(type==='edit'){
    editNote();
}else{
    addNewNote();
}

  }
  return (
    <div className="p-8 relative">
        <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute top-3 right-3 bg-slate-300"
        onClick={onClose}
        ><MdClose className="text-xl text-slate-400"/></button>
      
        <div className="flex flex-col">
          <label className="py-1">TITLE</label>
          <input type="text" className="border px-3 py-2" onChange={(e)=>setTitle(e.target.value)}
          value={title}/>
        </div>
        <div className="flex flex-col">
          <label className="py-1">CONTENT</label>
          <textarea name="" className="border px-3 py-2" value={content} rows={5} onChange={(e)=>setContent(e.target.value)}></textarea>
        </div>
        <div className="flex flex-col">
          <label className="py-1">TAGS</label>

          <TagInput tags={tags} setTags={setTags}/>
        </div>
       {error && <p className="text-red-600">{error}</p>}
        <button
          className="bg-blue-700 text-white mt-2 px-3 py-2 rounded"
          type="submit"
          onClick={handleNote}
        >
          {type==='edit'? 'Update':"ADD"}
        </button>
     
    </div>
  );
}

export default AddNote;
