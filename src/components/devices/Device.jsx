import React, { useState } from "react";
import AddDeviceModal from "./AddDeviceModal";
import DeviceItem from "./DeviceItem";
import ToastContainer from '../common/ToastContainer'
import { toast } from "react-toastify";

const Device = () => {
    let devices = [
        'buzzer',
        'horn',
        'engine',
        'light'
    ]

    const [device, setDevice] = useState(devices)
    const [prod, setProd] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(prod.length === 0){
            return toast.error('please enter device name first.')
        }
        toast.success('device added successfully!')
        setDevice([...device,prod])
        setProd('')
    }
  return (
    <>
    <ToastContainer/>
      <AddDeviceModal handleSubmit={handleSubmit} prod={prod} setProd={setProd} />
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
        {device.map((item , index )=> <DeviceItem item={item} index={index} />)}
        </div>
      </div>
    </>
  );
};

export default Device;
