import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from '../../context/AppContext'
import CryptoJS from "crypto-js";

const User = () => {
  const navigate = useNavigate();
  const {state ,dispatch} = useContext(AppContext)
  const handleLogout = () => {
    setTimeout(() => {
      toast.success("logout successfully!");
    }, 500);
    localStorage.removeItem("user");
    dispatch({ "type":"setInitialState"})
    navigate("/login");
  };
  
  
  return (
    <button className="btn btn-ghost btn-circle dropdown dropdown-end">
      <div className="tooltip tooltip-left lowercase" data-tip={state.currentProduct.email && state.currentProduct.email}>
      <div tabIndex={0} className="avatar">
      </div>
        <div className="w-8 rounded-full">
          <p className="-mt-3 text-xl uppercase">{state.currentProduct.email && state.currentProduct.email.slice(0,2)}</p>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <div
          onClick={handleLogout}
          className="flex text-center text-primary space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-gray-200 rounded-lg"
        >
          <AiOutlineLogout className="text-xl" />
          <p className="mt-1">Logout</p>
        </div>
      </ul>
    </button>
  );
};

export default User;
