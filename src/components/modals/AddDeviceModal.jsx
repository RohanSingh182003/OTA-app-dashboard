import React from "react";

const AddDeviceModal = ({handleSubmit , prod , setProd}) => {
  return (
    <>
      <input type="checkbox" id="add-device-modal" className="modal-toggle" />
      <label htmlFor="add-device-modal" className="modal cursor-pointer">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-6 w-72 h-52 rounded-lg grid place-items-center">
            <div className="relative">
              <input
              value={prod}
              onChange={(e)=>setProd(e.target.value)}
                type="text"
                id="floating_filled"
                className="block dark:bg-gray-700 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_filled"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Device name
              </label>
            </div>
          <button type="submit" className="w-full">
            <label htmlFor="add-device-modal" className="btn btn-ghost dark:btn-primary text-primary w-full">
              Add Device
            </label>
          </button>
        </form>
      </label>
    </>
  );
};

export default AddDeviceModal;
