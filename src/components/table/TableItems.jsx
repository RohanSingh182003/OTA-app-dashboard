import axios from "axios";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import { toast } from "react-toastify";
import UpdateProductModal from "../modals/UpdateProductModal";

const TableItems = (props) => {
  const handleUpdate = async (
    mac_address,
    version,
    file
  ) => {
    try {
      if (
        mac_address.length === 0 ||
        version.length === 0 || 
        file === null
      ) {
        toast.warn("please fill all fields");
        return null;
      }
      let myData = {
        mac_address,
        version,
        last_updated: new Date(),
        file
      };
      let res = await axios.put(
        `http://localhost:3000/api/products/device/${props.id}`,
        myData
      );
      if (res.status === 200) {
        toast.success("details updated successfully!");
        props.setKey(Math.random());
      } else {
        toast.error("An error occured!");
      }
    } catch (error) {
      toast.error("An error occured!");
    }
  };
  const handleDelete = async (id) => {
    try {
      let ans = confirm("Are you sure?");
      if (ans != true) {
        return null;
      }
      let res = await axios.delete(
        `http://localhost:3000/api/products/device/${id}`
      );
      if (res.status === 200) {
        toast.success("product deleted successfully!");
        props.setKey(Math.random());
      } else {
        toast.error("An error occured!");
      }
    } catch (error) {
      toast.error("An error occured!");
    }
  };
  return (
    <>
      <UpdateProductModal
        index={props.index + 1}
        handleUpdate={handleUpdate}
        mac_address={props.item.mac_address}
        current_version={Number.parseFloat(props.item.version)}
      />
      <tr className="hover">
        <th>{props.index + 1}</th>
        <td>{props.item.prod_name}</td>
        <td>{props.item.ip_address}</td>
        <td>{props.item.mac_address}</td>
        <td>{props.item.status}</td>
        <td>{props.item.function}</td>
        <td>{Number.parseFloat(props.item.version)}</td>
        <td>{props.item.last_updated}</td>
        <td>
          <div className="tooltip" data-tip="Update">
            <label htmlFor={`my-modal-${props.index + 1}`}>
              <BsFillPenFill
                onClick={() => {
                  props.setId(props.item._id);
                }}
                className="text-blue-600 w-10 cursor-pointer"
              />
            </label>
          </div>
        </td>
        <td>
          <div className="tooltip" data-tip="Delete">
            <AiFillDelete
              onClick={() => {
                handleDelete(props.item._id);
              }}
              className="text-red-600 w-10 h-6 cursor-pointer"
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableItems;
