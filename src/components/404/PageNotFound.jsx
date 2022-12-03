import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='w-[100vw] h-[100vh] grid place-items-center'>
      <div className='grid place-items-center p-6 rounded-md border border-black'>
        <p className='text-2xl'>Page Not Found</p>
        <p className='text-xs mt-2 text-gray-700'>This route is unavailable</p>
        <Link to={'/'} className='w-full'>
        <button className="btn btn-outline w-full mt-6">Goto Main Page</button>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound