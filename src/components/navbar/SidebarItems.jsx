import React, { useContext } from "react";
import { RiDeleteBackFill } from "react-icons/ri";
import AppContext from "../../context/AppContext";

const SidebarItems = (props) => {
  const { state } = useContext(AppContext);
  return (
    <div key={props.title} className="hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 flex items-center">
      <label
        onClick={() => props.setDevice(props.title)}
        className="label cursor-pointer px-6 py-4 w-5/6"
      >
        <span className="label-text dark:text-gray-100">{props.title}</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={props.title === state.currentDevice ? true : false}
        />
      </label>
      <div
        className="tooltip tooltip-right capitalize"
        data-tip={`delete ${props.title}`}
      >
        <RiDeleteBackFill
          onClick={() => props.handleDelete(props.title)}
          className="text-2xl text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SidebarItems;
