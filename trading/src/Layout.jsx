import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'

const Layout = ({ children }) => {
  return (
    <>
      <div className='flex flex-auto h-full'>
        <Sidebar />
        <div className='flex-row w-full'>
          <Navbar />
          <div className='px-2 sm:pl-16'>{children}</div>
        </div>
      </div>
    </>
  )
}

export default Layout
