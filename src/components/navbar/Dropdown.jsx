import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <AiOutlineMenuUnfold className="text-2xl" />
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-100 rounded-box w-52"
      >
        <li>
          <a>Homepage</a>
        </li>
        <li>
          <a>Services</a>
        </li>
        <li>
          <a>About</a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;