import React from "react";
import TableItems from "./TableItems";
import Modal from "../modals/AddProductModal";

const Table = () => {
  return (
    <>
      <Modal />
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
            <TableItems />
            <TableItems />
            <TableItems />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
