import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setTimeout(() => {
      toast.success("logout successfully!");
    }, 500);
    localStorage.removeItem("user");
    navigate("/login");
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  
  return (
    <button className="btn btn-ghost btn-circle dropdown dropdown-end">
      <div className="tooltip tooltip-left" data-tip={user?.email}>
      <div tabIndex={0} className="avatar">
      </div>
        <div className="w-8 rounded-full">
          <p className="-mt-3 text-xl uppercase">{user?.email.slice(0,2)}</p>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <div
          onClick={handleLogout}
          className="flex text-center text-blue-700 space-x-2 p-2 hover:bg-gray-200 rounded-lg"
        >
          <AiOutlineLogout className="text-xl" />
          <p className="mt-1">Logout</p>
        </div>
      </ul>
    </button>
  );
};

export default User;
