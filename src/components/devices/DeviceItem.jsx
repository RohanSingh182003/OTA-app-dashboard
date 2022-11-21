import React from "react";
import { RiDeleteBackFill } from 'react-icons/ri';

const DeviceItem = ({item , index}) => {
  return (
    <>
      <div key={index} className={`${index===0? 'md:ml-4 md:mt-4': ''} w-full h-24 md:w-52 md:h-44 border rounded-md bg-black text-gray-100 grid place-items-center relative`}>
        <p>{item}</p>
        <p className="absolute top-9 md:top-2 right-2">
        <div className="tooltip tooltip-bottom" data-tip="delete">
          <RiDeleteBackFill className="text-2xl text-red-500" />
          </div>
          </p>
      </div>
    </>
  );
};

export default DeviceItem;
