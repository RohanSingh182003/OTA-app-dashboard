import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProductModal = ({
  handleUpdate,
  mac_address,
  current_version,
  index
}) => {
  const [mac, setMac] = useState('');
  const [version, setVersion] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    setMac(mac_address)
  }, [])
  

  return (
    <>
      <input type="checkbox" id={`my-modal-${index}`} className="modal-toggle" />
      <label htmlFor={`my-modal-${index}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {/* form starts here */}
          <div>
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
                  Updated version
                </label>
              </div>
              <input
              type="file"
              onChange={changeHandler}
              className="file-input w-full max-w-xs"
            />
            </div>
          {/* modal closeing or sumiting button  */}
          <div className="grid place-items-end">
              <label
                onClick={() => {
                  handleUpdate(mac, version , selectedFile);
                  setVersion('')
                }}
                htmlFor={`my-modal-${index}`}
                className="btn btn-ghost text-primary dark:btn-primary"
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
