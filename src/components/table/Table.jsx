import React, { useEffect, useState } from "react";
import TableItems from "./TableItems";
import Modal from "../modals/AddProductModal";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

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
        setInterval(() => {
          setKey(Math.random());
        }, 500);
      } else {
        toast.error("An error occured!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product already exists! Enter a different one");
    }
  };

  useEffect(() => {
    getData();
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
          <Spinner/>
        )}
      </div>
    </>
  );
};

export default Table;
