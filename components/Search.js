/* eslint-disable max-len */
import React from 'react'
import { useRef } from 'react'


export default function Search({submbitEvent}){
  let inputref = useRef()
  const handleKeyEvent = (event) => {
    if (event.key === 'Enter') {
      submbitEvent(inputref.current.value)
    }
  }
  return (
    <div className='border-2 flex justify-between p-2 rounded-md font-karla md:p-4 hover:border-portal1'>
      <input id='searchInput' type='text' placeholder='Search for dataset by keyword...' className='focus:outline-none' ref={inputref} onKeyPress={handleKeyEvent}/>
      <button className='focus:outline-none' onClick={()=> { submbitEvent(inputref.current.value)}}><img src="/search2.svg" /></button>
    </div>
  )
}
