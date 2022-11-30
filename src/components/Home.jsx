import React, { useContext, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Table from "./table/Table";
import ToastContainer from "./common/ToastContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/AppContext";
import CryptoJS from "crypto-js";

const Home = () => {
  let navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const isLogin = () => {
    let user = localStorage.getItem("user");
    if (user === null) {
      return navigate("/login");
    }
  };

  const setUser = (user) => {
    dispatch({
      type: "setProduct",
      payload: { user },
    });
    if (user.devices.length > 0) {
      dispatch({
        type: "setDevice",
        payload: { device: user.devices[0] },
      });
    }
  };

  const getData = async () => {
    let res = await axios.get("http://localhost:3000/api/products", {
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImRldmljZXMiOltdLCJwcm9kdWN0IjpbeyJ2ZXJzaW9uIjozLCJtYWNfYWRkcmVzcyI6IjEyOjM0OjU2Ojc4In1dLCJpYXQiOjE2Njk3MzU0OTB9.TEcLx7ClSESbbZf0Vtma9m9mvC6n-Co4pttsnnhrrSE`,
      },
    }); // admin token , its required too access data.

    let email = localStorage.getItem("user");
    let dec_email = CryptoJS.AES.decrypt(email, "SixSenseMobility").toString(
      CryptoJS.enc.Utf8
    );
    let user = res.data.find((item) => item.email === dec_email);
    // if user doesn't exists
    if (!user) {
      let new_document = {
        email: dec_email,
        isAdmin: false,
        devices: [],
        product: [],
      };
      let res = await axios.post(
        "http://localhost:3000/api/products",
        new_document
      );
      return setUser(res.data);
    }
    //if user exixts
    setUser(user);
  };
  useEffect(() => {
    getData();
    isLogin();
  }, []);

  useEffect(() => {}, [state.currentDevice]); // to render component whenever currentDevice changed.

  useEffect(() => {
    getData();
  }, [state.key]); // to render components whenever make api calls and get current data.

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="grid place-items-center xl:px-20">
        <h2 className="text-xl md:text-3xl my-4 p-2 font-semibold text-primary">
          OTA Update Management System
        </h2>
        <Table />
      </div>
    </>
  );
};

export default Home;
