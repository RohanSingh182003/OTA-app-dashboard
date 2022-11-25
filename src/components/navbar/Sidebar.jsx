import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import SidebarItems from "./SidebarItems";

const Dropdown = () => {
  const [toggle, setToggle] = useState('-translate-x-full')
  const handleToggle = () => {
    if(toggle === '-translate-x-full'){
      setToggle('translate-x-0')
    }
    else{
      setToggle('-translate-x-full')
    }
  }
  return (
    <div className="dropdown relative">
      <label onClick={handleToggle} className="btn btn-ghost btn-circle">
        <AiOutlineMenuUnfold className="text-2xl" />
      </label>
      {/* sidebar starts here  */}
      <section className={`absolute -top-2 -left-2 bg-gray-200 w-[100vw] md:w-72 h-[100vh] border py-2 px-6 transition-transform ${toggle}`}>
        <AiOutlineClose onClick={handleToggle} className="absolute right-2 text-2xl text-gray-400 rounded-full hover:bg-gray-300 cursor-pointer"/>
        <h2 className="text-center text-2xl py-3 text-primary border-gray-300 border-b-2 font-semibold">
          Control Center
        </h2>
        <button className="btn btn-primary btn-outline w-full my-2">
          + Add Devices
        </button>
        <div className="container">
          <h3 className="text-primary text-center py-4 border-b border-gray-300">Select device</h3>
          <div className="form-control">
            <SidebarItems title={'Device 1'}/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dropdown;
