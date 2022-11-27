import React, { useEffect, useState } from "react";
// import AddDeviceModal from "./AddDeviceModal";
import DeviceItem from "./DeviceItem";
import ToastContainer from "../common/ToastContainer";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Device = () => {
  const navigate = useNavigate()
  const [device, setDevice] = useState([]);
  const [prod, setProd] = useState("");
  const [key, setKey] = useState(null)

  const getData = async () => {
      let res = await axios.get(
        `http://localhost:3000/api/products`
      );
      let device = res.data.find(ele => ele.email === JSON.parse(localStorage.getItem("user")).email)
      setDevice(device.devices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.get(
      `http://localhost:3000/api/products`
    );
    let device = res.data.find(ele => ele.email === JSON.parse(localStorage.getItem("user")).email)
    if (prod.length === 0) {
      return toast.error("please enter device name first.");
    }
    if(device){
    let response = await axios.post(`http://localhost:3000/api/products/deviceType/${device._id}`,
    {devices : prod}
    )
    if(response.status === 200){
      toast.success("device added successfully!");
      setProd("");
      setInterval(() => {
        setKey(Math.random())
      }, 500);
    } else {
      toast.warn('product already exists.')
    }
} else{
    let email = JSON.parse(localStorage.getItem("user")).email
    let new_document = {
      email,
      isAdmin : false,
      devices : [prod],
      product : []
    }
    axios.post('http://localhost:3000/api/products',new_document).then(()=> setKey(Math.random()))
}
  };

  const handleDelete = async (item) => {
    let ans = confirm('are you confirm to delete this device?')
    if(ans!= true) return undefined
    let res = await axios.get(
      `http://localhost:3000/api/products`
    );
    let device = res.data.find(ele => ele.email === JSON.parse(localStorage.getItem("user")).email)
    axios.delete(`http://localhost:3000/api/products/deviceType/${device._id}/${item}`).then(()=>{
      axios.delete(`http://localhost:3000/api/products/device/${device._id}/${item}`)
      toast.success("device deleted successfully!");
      setKey(Math.random())
    })
  }

  const handleRedirect = async (item) => {
    let res = await axios.get(
      `http://localhost:3000/api/products`
    );
    let device = res.data.find(ele => ele.email === JSON.parse(localStorage.getItem("user")).email)
    localStorage.setItem('user',JSON.stringify({item,id:device._id,email:device.email}))
    navigate('/')
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [key]);

  return (
    <>
      <ToastContainer />
      <AddDeviceModal
        handleSubmit={handleSubmit}
        prod={prod}
        setProd={setProd}
      />
      <div className="bg-gradient-to-br from-white via-gray-300 to-white min-h-[100vh]">
        <h2 className="py-4 text-center text-3xl font-semibold">
          Select Device
        </h2>
        <div className="grid place-items-end px-4 my-4">
          <label htmlFor="my-modal" className="btn">
            + Add device
          </label>
        </div>
        {/* list of devices */}
        <div className="flex flex-col md:flex-row flex-wrap md:px-8 md:space-x-4 space-y-4">
          {device.length > 0 ? device.map((item, index) => (
            <DeviceItem item={item} index={index} handleDelete={handleDelete} handleRedirect={handleRedirect} />
          )) : 
          <div className="w-full grid place-items-center">
          <p className="text-2xl">No devices found , Let's add one...</p>
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default Device;
