import axios from "axios";
import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import { toast } from "react-toastify";
import UpdateProductModal from "../modals/UpdateProductModal";
import AppContext from "../../context/AppContext";

const TableItems = (props) => {
  const { dispatch , state } = useContext(AppContext);
  const handleUpdate = async (mac_address, version, file) => {
    try {
      if (mac_address.length === 0 || version.length === 0 || file === null) {
        toast.warn("please fill all fields");
        return null;
      }
      let myData = {
        mac_address,
        version,
        last_updated: new Date(),
      };
      let email = state.currentProduct.email;
      let res = await axios.put(
        `https://six-sense-mobility-iot.vercel.app/api/products/device/${props.id}`,
        { product: myData, email, upload_file: file },
        { headers: { "Content-Type": "multipart/form-data" , "authorization": `Bearer ${state.currentProduct.token}` } }
      );
      if (res.status === 200) {
        toast.success("details updated successfully!");
        dispatch({ type: "setKey" });
      } else {
        toast.error("An error occured!");
      }
    } catch (error) {
      console.log(error.message)
      toast.error("An error occured!");
    }
  };
  const handleDelete = async () => {
    try {
      let ans = confirm("Are you sure?");
      if (ans != true) {
        return null;
      }
      let res = await axios.delete(
        `https://six-sense-mobility-iot.vercel.app/api/products/device/${props.id}`,
        {headers : {"authorization": `Bearer ${state.currentProduct.token}`}}
      );
      if (res.status === 200) {
        toast.success("product deleted successfully!");
        dispatch({ type: "setKey" });
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
        mac_address={props.mac}
        current_version={Number.parseFloat(props.version)}
      />
      <tr className="hover">
        <th>{props.index + 1}</th>
        <td>{props.item.prod_name}</td>
        <td>{props.item.ip_address}</td>
        <td>{props.item.mac_address}</td>
        <td>{props.item.status}</td>
        <td>{props.item.function}</td>
        <td>{Number.parseFloat(props.item.version)}</td>
        <td>{props.item.last_updated.slice(0, 10)}</td>
        <td>
          <div className="tooltip" data-tip="Update">
            <label htmlFor={`my-modal-${props.index + 1}`}>
              <BsFillPenFill className="text-primary w-10 cursor-pointer" />
            </label>
          </div>
        </td>
        <td>
          <div className="tooltip" data-tip="Delete">
            <AiFillDelete
              onClick={() => {
                handleDelete();
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
