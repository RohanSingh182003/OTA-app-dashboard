import React from 'react'
import { RiDeleteBackFill } from 'react-icons/ri'

const SidebarItems = (props) => {
  return (
    <div className='hover:bg-gray-300 flex items-center'>
    <label onClick={()=> props.setDevice(props.title)} className="label cursor-pointer px-6 py-4 w-5/6">
    <span className="label-text">{props.title}</span>
    <input
      type="radio"
      name="radio"
      className="radio checked:bg-primary"
    />
  </label>
  <RiDeleteBackFill onClick={() => props.handleDelete()} className="text-2xl text-red-500 cursor-pointer" />
  </div>
  )
}

export default SidebarItems