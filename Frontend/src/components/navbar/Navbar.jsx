import React from "react";
import {
  AiOutlineMenuUnfold,
  AiOutlineSearch,
  AiOutlineBell,
} from "react-icons/ai";
import Search from "./Search";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
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
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Six Sense Mobility</a>
      </div>
      <div className="navbar-end">
        <Search/>
        <button className="btn btn-ghost btn-circle">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://www.indiewire.com/wp-content/uploads/2021/08/Robert-Pattinson-Batman.jpeg?w=780" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
