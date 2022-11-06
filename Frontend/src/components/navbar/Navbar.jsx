import React from "react";
import Dropdown from "./Dropdown";
import Search from "./Search";
import User from "./User";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <Dropdown/>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Six Sense Mobility</a>
      </div>
      <div className="navbar-end">
        <Search/>
        <User/>
      </div>
    </div>
  );
};

export default Navbar;
