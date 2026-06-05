import React from 'react'

const Navbar = () => {
  return (
   <header className='w-full h-16 flex items-center justify-center bg-white/80 backdrop-blur-lg fixed top-0 left-0 z-50 shadow-sm '>
    <h1 className='text-xl font-medium text-gray-800'>
        Sky
        <span className="text-blue-500">Pulse</span>
    </h1>
   </header>
  )
}

export default Navbar
