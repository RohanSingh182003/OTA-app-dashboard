import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import UpdateProductModal from "../modals/UpdateProductModal";

const TableItems = (props) => {
  const handleUpdate = async (id) => {
    // const response = await async.put(`http://localhost:5000/api/dashboard/${id}`)
    console.log(id)
  }
  return (
    <>
      <UpdateProductModal />{" "}
      <tr className="hover">
        <th>{props.index + 1}</th>
        <td>{props.item.prod_name}</td>
        <td>{props.item.ip_address}</td>
        <td>{props.item.mac_address}</td>
        <td>{props.item.function}</td>
        <td>{props.item.version}</td>
        <td>{props.item.last_updated}</td>
        <td>
          <div onClick={()=> handleUpdate(props.item._id)} className="tooltip" data-tip="Update">
            <label htmlFor="my-modal-5">
              <BsFillPenFill className="text-blue-600 w-10 cursor-pointer" />
            </label>
          </div>
        </td>
        <td>
          <div className="tooltip" data-tip="Delete">
            <AiFillDelete className="text-red-600 w-10 h-6 cursor-pointer" />
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableItems;
