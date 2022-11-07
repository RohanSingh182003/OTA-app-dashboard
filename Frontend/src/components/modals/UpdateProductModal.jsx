import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProductModal = ({
  handleUpdate,
  prod_name,
  ip_address,
  mac_address,
  current_func,
  current_version,
  index
}) => {
  // console.log(prod_name , ip_address , mac_address , current_func , current_version)
  const [name, setName] = useState(prod_name);
  const [ip, setIp] = useState(ip_address);
  const [mac, setMac] = useState(mac_address);
  const [func, setFunc] = useState(current_func);
  const [version, setVersion] = useState(current_version);

  return (
    <>
      <input type="checkbox" id={`my-modal-${index}`} className="modal-toggle" />
      <label htmlFor={`my-modal-${index}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {/* form starts here */}
          <div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Name
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                onChange={(e) => setIp(e.target.value)}
                value={ip}
                type="text"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                IP Address
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                onChange={(e) => setMac(e.target.value)}
                value={mac}
                type="text"
                name="repeat_password"
                id="floating_repeat_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_repeat_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                MAC Address
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 mb-6 w-full group">
                <input
                  onChange={(e) => setFunc(e.target.value)}
                  value={func}
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Function
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  onChange={(e) => setVersion(e.target.value)}
                  value={version}
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Version
                </label>
              </div>
            </div>
          </div>
          {/* modal closeing or sumiting button  */}
          <div className="grid place-items-end">
              <label
                onClick={() => {
                  handleUpdate(name, ip, mac, func, version);
                }}
                htmlFor={`my-modal-${index}`}
                className="btn btn-ghost text-blue-700"
              >
                Update Product
              </label>
              </div>
        </label>
      </label>
    </>
  );
};

export default UpdateProductModal;
