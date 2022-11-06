import axios from "axios";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import { toast } from "react-toastify";
import UpdateProductModal from "../modals/UpdateProductModal";

const TableItems = (props) => {

  const [data, setData] = useState(null)

  const getData = async (id) => {
    let res = await axios.get(`http://localhost:5000/api/dashboard/${id}`)
    setData(...res.data)
    console.log(...res.data)
  }
  

  const handleUpdate = async (
    prod_name,
    ip_address,
    mac_address,
    func,
    version
  ) => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    let myData = {
      prod_name,
      ip_address,
      mac_address,
      function: func,
      version,
      last_updated: currentDate,
    };
    let res = await axios.put(
      `http://localhost:5000/api/dashboard/${props.id}`,
      myData
    );
    if (res.status === 200) {
      toast.success("details updated successfully!");
      props.setKey(Math.random());
    } else {
      toast.error("An error occured!");
    }
  };
  const handleDelete = async (id) => {
    let ans = confirm("Are you sure?");
    if (ans != true) {
      return null;
    }
    let res = await axios.delete(`http://localhost:5000/api/dashboard/${id}`);
    if (res.status === 200) {
      toast.success("product deleted successfully!");
      props.setKey(Math.random());
    } else {
      toast.error("An error occured!");
    }
  };
  return (
    <>
      <UpdateProductModal data={data} handleUpdate={handleUpdate} />{" "}
      <tr className="hover">
        <th>{props.index + 1}</th>
        <td>{props.item.prod_name}</td>
        <td>{props.item.ip_address}</td>
        <td>{props.item.mac_address}</td>
        <td>{props.item.function}</td>
        <td>{Number.parseFloat(props.item.version)}</td>
        <td>{props.item.last_updated}</td>
        <td>
          <div className="tooltip" data-tip="Update">
            <label htmlFor="my-modal-5">
              <BsFillPenFill
                onClick={() => {
                  props.setId(props.item._id);
                  getData(props.item._id)
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
