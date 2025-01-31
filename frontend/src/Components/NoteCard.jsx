import React, { useState } from 'react'
import { TiPinOutline } from "react-icons/ti";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";


function NoteCard({
   title,
   date,
   content,
   tags,
   isPinned,
   onEdit,
   onDelete,
   onPinNote,
   
}) {

   
  return (

     <div className='border shadow-md p-4'>
        <h3 className='text-lg font-semibold '>{title}</h3>
        <div className='py-2 flex justify-between'>
        <p className='text-xs '>{date} </p>
        <TiPinOutline size={20} className={`cursor-pointer ${isPinned? 'text-blue-400':''}`}/>
        </div>
        <p>{content} </p>
        <div className='py-2 flex justify-between'>
        <p >{tags}</p>
        <p className='flex'><MdModeEditOutline className='mr-2 cursor-pointer' onClick={onEdit}/> <MdDelete onClick={onDelete}  className='hover:text-red-600 cursor-pointer'/></p>
        </div>
     </div>
    
  )
}

export default NoteCard