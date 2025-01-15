import React from 'react'
import { TiPinOutline } from "react-icons/ti";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";


function NoteCard() {
  return (
    <div className='container mx-auto mt-8'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
     <div className='border shadow-md p-4'>
        <h3 className='text-lg font-semibold '>Title of Note</h3>
        <div className='py-2 flex justify-between'>
        <p className='text-xs '>{new Date().toLocaleString()} </p>
        <TiPinOutline size={20}/>
        </div>
        <p>You may be wondering, "What is a remote manager?" They are any senior employee responsible for directing a team who work entirely or partly from a different physical location. </p>
        <div className='py-2 flex justify-between'>
        <p >tages# tag2# </p>
        <p className='flex'><MdModeEditOutline className='mr-2'/> <MdDelete/></p>
        </div>
     </div>

     <div className='border shadow-md p-4'>
        <h3 className='text-lg font-semibold '>Title of Note</h3>
        <div className='py-2 flex justify-between'>
        <p className='text-xs '>{new Date().toLocaleString()} </p>
        <TiPinOutline size={20}/>
        </div>
        <p>You may be wondering, "What is a remote manager?" They are any senior employee responsible for directing a team who work entirely or partly from a different physical location. </p>
        <div className='py-2 flex justify-between'>
        <p >tages# tag2# </p>
        <p className='flex'><MdModeEditOutline className='mr-2'/> <MdDelete/></p>
        </div>
     </div>

     <div className='border shadow-md p-4'>
        <h3 className='text-lg font-semibold '>Title of Note</h3>
        <div className='py-2 flex justify-between'>
        <p className='text-xs '>{new Date().toLocaleString()} </p>
        <TiPinOutline size={20}/>
        </div>
        <p>You may be wondering, "What is a remote manager?" They are any senior employee responsible for directing a team who work entirely or partly from a different physical location. </p>
        <div className='py-2 flex justify-between'>
        <p >tages# tag2# </p>
        <p className='flex'><MdModeEditOutline className='mr-2'/> <MdDelete/></p>
        </div>
     </div>

     <div className='border shadow-md p-4'>
        <h3 className='text-lg font-semibold '>Title of Note</h3>
        <div className='py-2 flex justify-between'>
        <p className='text-xs '>{new Date().toLocaleString()} </p>
        <TiPinOutline size={20}/>
        </div>
        <p>You may be wondering, "What is a remote manager?" They are any senior employee responsible for directing a team who work entirely or partly from a different physical location. </p>
        <div className='py-2 flex justify-between'>
        <p >tages# tag2# </p>
        <p className='flex'><MdModeEditOutline className='mr-2'/> <MdDelete/></p>
        </div>
     </div>

     <div className='border shadow-md p-4'>
        <h3 className='text-lg font-semibold '>Title of Note</h3>
        <div className='py-2 flex justify-between'>
        <p className='text-xs '>{new Date().toLocaleString()} </p>
        <TiPinOutline size={20}/>
        </div>
        <p>You may be wondering, "What is a remote manager?" They are any senior employee responsible for directing a team who work entirely or partly from a different physical location. </p>
        <div className='py-2 flex justify-between'>
        <p >tages# tag2# </p>
        <p className='flex'><MdModeEditOutline className='mr-2'/> <MdDelete/></p>
        </div>
     </div>
    </div>
    </div>
  )
}

export default NoteCard