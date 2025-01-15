import React from 'react'
import { FaSearch } from 'react-icons/fa';

function Navnar() {
  return (
    <div className='full-container border-b shadow'>
    <div className='flex justify-between items-center p-4'>
   <h2 className='text-xl font-bold'>Note</h2>
  <form className='relative'>
    <input type="text" className='border border-gray-700 px-6 py-1 rounded-md bg-gray-300 '/>
    <span className='absolute right-2 top-2'><FaSearch/></span>
    </form>
   <div>
  <div className='flex  '>
    <div className='flex w-5 h-5 bg-gray-300 rounded-full p-4 items-center justify-center font-semibold'>
    <h2>YT</h2>
    </div>
    
    <p className='mr-1'>Yonni Tala</p>
    <button className='ml-4 underline'>Lougout</button>
  </div>
  
   </div>
   
    </div>
    </div>
    
  )
}

export default Navnar