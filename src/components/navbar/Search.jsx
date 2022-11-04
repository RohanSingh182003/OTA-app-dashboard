import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
          <div className="dropdown dropdown-end">
      <button className="btn btn-ghost btn-circle">
        <label tabIndex={0}>
          <AiOutlineSearch className="text-2xl cursor-pointer" />
        </label>
        <div
          tabIndex={0}
          className="menu dropdown-content p-2 shadow bg-base-200 rounded-box w-64 mt-4"
        >
          <input
            type="text"
            placeholder="Search here"
            className="input w-full max-w-xs"
          />
        </div>
      </button>
    </div>
  );
};

export default Search;
