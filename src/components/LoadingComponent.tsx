import React from 'react'

export default function LoadingComponent() {
  return (
    <div className='flex justify-center  items-center w-full h-screen'>
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
    </div>
  )
}
