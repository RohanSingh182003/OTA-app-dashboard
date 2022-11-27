import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import SidebarItems from "./SidebarItems";
import AppContext from "../../context/AppContext";
import AddDeviceModal from "../modals/AddDeviceModal";
import axios from "axios";
import { toast } from "react-toastify";

const Dropdown = () => {
  const setInitialDevice = () => {
    if (state.currentProduct) {
      if (
        state.currentProduct.devices &&
        state.currentProduct.devices.length === 0
      ) {
        return null;
      }
      return state.currentProduct.devices && state.currentProduct.devices[0];
    }
  };
  const { state, dispatch } = useContext(AppContext);
  const [device, setDevice] = useState(setInitialDevice());
  const [toggle, setToggle] = useState("-translate-x-full");
  const [prod, setProd] = useState("");
  const handleToggle = () => {
    if (toggle === "-translate-x-full") {
      setToggle("translate-x-0");
    } else {
      setToggle("-translate-x-full");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prod.length === 0) {
      return toast.error("please enter device name first.");
    }
    let existingProd = state.currentProduct.devices.find((ele) => ele === prod);
    if (existingProd) return toast.warn("poroduct already exists!");
    let response = await axios.post(
      `http://localhost:3000/api/products/deviceType/${state.currentProduct._id}`,
      { devices: prod }
    );
    if (response.status === 200) {
      toast.success("device added successfully!");
      setProd("");
      dispatch({
        type: "setKey",
      });
    } else {
      toast.warn("product already exists.");
    }
  };

  const handleDelete = (item) => {
    let ans = confirm("are you confirm to delete this device?");
    if (ans != true) return undefined;
    axios
      .delete(
        `http://localhost:3000/api/products/deviceType/${state.currentProduct._id}/${item}`
      )
      .then(() => {
        axios.delete(
          `http://localhost:3000/api/products/device/${state.currentProduct._id}/${item}`
        );
        toast.success("device deleted successfully!");
        dispatch({
          type: "setKey",
        });
      });
  };

  useEffect(() => {
    dispatch({
      type: "setDevice",
      payload: { device },
    });
  }, [device]);

  return (
    <div className="dropdown relative">
      <AddDeviceModal
        handleSubmit={handleSubmit}
        prod={prod}
        setProd={setProd}
      />
      <label onClick={handleToggle} className="btn btn-ghost btn-circle">
        <AiOutlineMenuUnfold className="text-2xl" />
      </label>
      {/* sidebar starts here  */}
      <section
        className={`absolute -top-2 -left-2 backdrop-blur-md shadow-2xl w-72 h-[100vh] border py-2 px-6 transition-transform ${toggle} z-20`}
      >
        <AiOutlineClose
          onClick={handleToggle}
          className="absolute right-4 md:right-2 text-2xl text-gray-400 rounded-full hover:bg-gray-300 cursor-pointer"
        />
        <h2 className="text-center text-2xl py-3 text-primary font-bold">
          Control Center
        </h2>
        <label
          htmlFor="add-device-modal"
          className="btn btn-primary w-full my-2 shadow-lg"
        >
          + Add Device
        </label>
        <div className="container">
          <h3 className="text-primary text-center py-4 border-b">
            Select device
          </h3>
          <div className={`form-control backdrop-blur-2xl shadow-lg ${state.currentProduct.devices && state.currentProduct.devices.length > 0 ? 'border border-gray-300 rounded-md' : ''}`}>
            {state.currentProduct.devices && state.currentProduct.devices.length > 0 ?
              state.currentProduct.devices.map((item) => {
                return (
                  <SidebarItems
                    setDevice={setDevice}
                    handleDelete={handleDelete}
                    title={item}
                  />
                );
              }) 
            :
            <p className="text-primary text-xl text-center font-semibold">No devices, let's add one.</p>
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dropdown;
