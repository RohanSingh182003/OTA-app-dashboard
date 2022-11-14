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
    let response = await axios.get("https://six-sense-mobility-iot.vercel.app/api/products");
    setData(response.data);
  };

  // function for add data
  const handleSubmit = async (
    prod_name,
    ip_address,
    mac_address,
    func,
    version,
    file
  ) => {
    let myData = {
      prod_name,
      ip_address,
      mac_address,
      function: func,
      version,
      last_updated: new Date(),
      file
    };
    try {
      let res = await axios.post("https://six-sense-mobility-iot.vercel.app/api/products", myData);
      console.log(res)
      if (res.status === 200) {
        toast.success("product added successfully!");
        setKey(Math.random());
      } else {
        toast.error("An error occured!");
      }
    } catch (error) {
      console.log(error)
      toast.error("Product already exists! Enter a different one")
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
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>SL_NO</th>
              <th>Name</th>
              <th>IP Address</th>
              <th>MAC Address</th>
              <th>Fuction</th>
              <th>Version</th>
              <th>Last Updated</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row --> */}
            {data != null &&
              data.map((item, index) => (
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
      </div>
    </>
  );
};

export default Table;
