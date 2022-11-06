import React, { useEffect, useState } from "react";
import TableItems from "./TableItems";
import Modal from "../modals/AddProductModal";
import axios from "axios";

const Table = () => {

  const [data, setData] = useState(null)

  const getData = async () => {
    let response = await axios.get('http://localhost:5000/api/dashboard')
    setData(response.data)
  }

  const handleSubmit = async (prod_name,ip_address,mac_address,func,version) => {
    console.log(prod_name,ip_address,mac_address,func,version)
  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <>
      <Modal handleSubmit={handleSubmit} />
      {/* add products and open modal button */}
      <div className="grid w-full place-items-end">
      <label htmlFor="my-modal-4" className="btn btn-ghost text-blue-500">+ Add Products</label>
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
            {data!=null && data.map((item , index)=> <TableItems key={index} item={item} index={index} />)}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
