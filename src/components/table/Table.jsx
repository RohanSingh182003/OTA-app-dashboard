import React, { useEffect, useState } from "react";
import TableItems from "./TableItems";
import Modal from "../modals/AddProductModal";
import axios from "axios";
import { toast } from "react-toastify";

const Table = () => {
  // state varables
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [key, setKey] = useState(null);

  const getData = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let response = await axios.get(
      `http://localhost:3000/api/products/${user.id}`
    );
    let filter_response = response.data.product.filter(
      (ele) => ele.device_type === user.item
    );
    setData(filter_response);
  };

  // function for add data
  const handleSubmit = async (
    prod_name,
    ip_address,
    mac_address,
    status,
    func,
    version,
    file
  ) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let myData = {
      device_type: user.item,
      prod_name,
      ip_address,
      mac_address,
      status,
      function: func,
      version,
      last_updated: new Date(),
      file,
    };
    try {
      let res = await axios.post(
        `http://localhost:3000/api/products/device/${user.id}`,
        { product: myData }
      );
      if (res.status === 200) {
        toast.success("product added successfully!");
        setKey(Math.random());
      } else {
        toast.error("An error occured!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product already exists! Enter a different one");
    }
  };

  const getLoadingStatus = () => {
    setTimeout(() => {
        try {
        document.getElementById('loading').innerHTML = "No device found!"
      } catch (error) {
        console.log(error)
      }
      }, 30000);
  }

  useEffect(() => {
    getData();
    getLoadingStatus()
  }, []);

  // render component after adding new data
  useEffect(() => {
    getData();
  }, [key]);

  return (
    <>
      <Modal handleSubmit={handleSubmit} />
      {/* add products and open modal button */}
      <div className="grid w-full place-items-end">
        <label htmlFor="my-modal" className="btn btn-ghost text-blue-500">
          + Add Products
        </label>
      </div>
      <div className="overflow-x-auto w-full">
        {/* table starts here */}
        {data != null && data.length != 0 ? (
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>SL_NO</th>
                <th>Name</th>
                <th>IP Address</th>
                <th>MAC Address</th>
                <th>Status</th>
                <th>Fuction</th>
                <th>Version</th>
                <th>Last Updated</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row --> */}
              {data.map((item, index) => (
                <TableItems
                  key={index}
                  item={item}
                  index={index}
                  setKey={setKey}
                  setId={setId}
                  id={id}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full">
            <p className="text-center text-2xl text-blue-700" id="loading">
              <div role="status">
                <svg
                  className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mt-8"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
