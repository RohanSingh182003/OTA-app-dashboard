import React, { useContext, useEffect, useState } from "react";
import TableItems from "./TableItems";
import Modal from "../modals/AddProductModal";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import AppContext from "../../context/AppContext";

const Table = () => {
  const { state, dispatch } = useContext(AppContext);

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
    let myData = {
      device_type: state.currentDevice,
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
        `http://localhost:3000/api/products/device/${state.currentProduct._id}`,
        { product: myData }
      );
      if (res.status === 200) {
        toast.success("product added successfully!");
        dispatch({ type: "setKey" });
        setInterval(() => {}, 500);
      } else {
        toast.error("An error occured!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product already exists! Enter a different one");
    }
  };

  const filterProducts = (products) => {
    return products.filter((item) =>
      item.device_type === state.currentDevice
    );
  };

  return (
    <>
      <Modal handleSubmit={handleSubmit} />
      {/* add products and open modal button */}
      <div className="grid w-full place-items-end">
        <label htmlFor="my-modal" className="btn btn-ghost text-primary">
          + Add Products
        </label>
      </div>
      <div className="overflow-x-auto w-full">
        {/* table starts here */}
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead className="-z-10">
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
            {state.currentProduct.product &&
            state.currentProduct.product.length > 0 ? (
              filterProducts(state.currentProduct.product).map(
                (item, index) => (
                  <TableItems
                    key={index}
                    item={item}
                    index={index}
                    id={item._id}
                    mac={item.mac_address}
                    version={item.version}
                  />
                )
              )
            ) : (
              <Spinner />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
