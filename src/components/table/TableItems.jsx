import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import UpdateProductModal from "../modals/UpdateProductModal";

const TableItems = () => {
  return (
    <>
      <UpdateProductModal />{" "}
      <tr className="hover">
        <th>1</th>
        <td>ESP32_BUZZ</td>
        <td>192.168.43.235</td>
        <td>3C:71:BF:FD:0D:6C</td>
        <td>Buzzer</td>
        <td>1.0</td>
        <td>2020-07-30</td>
        <td>
          <div className="tooltip" data-tip="Update">
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
