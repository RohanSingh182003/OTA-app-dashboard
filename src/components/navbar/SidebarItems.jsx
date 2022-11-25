import React from 'react'

const SidebarItems = (props) => {
  return (
    <label className="label cursor-pointer px-6 py-4 hover:bg-gray-300">
    <span className="label-text">{props.title}</span>
    <input
      type="radio"
      name="radio"
      className="radio checked:bg-primary"
    />
  </label>
  )
}

export default SidebarItems