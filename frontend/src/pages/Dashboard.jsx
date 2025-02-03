import React,{useEffect, useState} from "react";
import { IoMdAdd } from "react-icons/io";
import NoteCard from "../Components/NoteCard";
import Modal from 'react-modal'
import AddNote from "../Components/AddNote";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import Navnar from "../Components/Navnar";

function Dashboard() {
  const [openAddEditModal,setOpenAddEditModal]=useState({
    isShown:false,
    type:"add",
    data:null,
    
 })
const [allNotes,setAllNotes]=useState([]);
 const [userInfo,setUserInfo]=useState(null);
 const navigate=useNavigate();
  const handleEdit=(noteDetails)=>{
    setOpenAddEditModal({isShown:true,data:noteDetails,type:"edit"});
  }
 const getUserInfo=async ()=>{
  try {
    const response=await axiosInstance.get('/ger-user');
    if(response.data && response.data.user){
      setUserInfo(response.data.user);
    }
  } catch (error) {
    if(error.response.status===401){
      localStorage.clear();
      navigate('/login');
    }
  }
 };

 //get all notes
 const getAllNotes=async ()=>{
  try {
    const response=await axiosInstance.get("/get-all-notes");
    if(response.data && response.data.notes){
      setAllNotes(response.data.notes);
    }
  } catch (error) {
    console.log("An Expected error Occurred please try again")
  }
 }
 const deleteNote=async(data)=>{
  const noteId=data._id;
  try {
    const response=await axiosInstance.delete('/edit-note/'+noteId);
    if(response.data && response.data.note){
      getAllNotes();
  

    }
  } catch (error) {
    if(error.response && error.response.data && error.response.data.message){
      console.log("An Expected error Occurred please try again")
    }
  }
 }
 useEffect(()=>{
  getAllNotes();
  getUserInfo();
return ()=>{

}
 },[])
  return (
    <>
    <Navnar userInfo={userInfo}/>
    <div className="container mx-auto">
    <div className="grid grid-cols-3 gap-4 mt-8">
      {
        allNotes.map((item,index)=>(
          <NoteCard
          key={item._id}
        title={item.title}
        date={item.cteatedOn}
        content={item.content}
        tags={item.tags}
        isPinned={item.isPinned}
        onEdit={() => handleEdit(item)}
        onDelete={() => deleteNote(item)}
        onPinNote={() => {}}
      />
        ))
      }
     
      </div>
      </div>
      <button className="bg-blue-600 px-3 py-2 rounded absolute right-8 bottom-5 text-white text-[30px]"
      onClick={()=>{
  setOpenAddEditModal({
    isShown:true,
    type:'add',
    data:null
  });
                }}>
        <IoMdAdd />
      </button>
      <Modal isOpen={openAddEditModal.isShown} 
      onRequestClose={()=>{}}
      style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,0.2",

        }
      }}
      contentLabel=""
      className='w-[40%] mx-auto mt-8  bg-white rounded'
      >
   <AddNote
   type={openAddEditModal.type}
   noteData={openAddEditModal.data}
   onClose={()=>{
    
    setOpenAddEditModal({
      isShown:false,
      type:'add',
      data:null
    });
   }}
   getAllNotes={getAllNotes}
   />
      </Modal>
    </>
  );
}

export default Dashboard;
