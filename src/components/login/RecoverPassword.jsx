import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToastContainer from "../common/ToastContainer";
import CryptoJS from "crypto-js";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return toast.error("passwords doesn't matched");
    }

    let enc_password = CryptoJS.AES.encrypt(
      password,
      "SixSenseMobility"
    ).toString();

    let response = await axios.get(
      "https://six-sense-mobility-iot.vercel.app/api/users"
    );

    let email = localStorage.getItem("recoveryEmail");

    let user = response.data.find((ele) => ele.email === email);

    let res = await axios.put(
      `https://six-sense-mobility-iot.vercel.app/api/users/${user._id}`,
      {
        password: enc_password,
      }
    );

    if (res.status != 200) {
      return toast.error("an error occured!");
    }
    setTimeout(() => {
      toast.success("password reset successfully.");
      localStorage.clear("recoveryEmail");
      localStorage.clear("recoveryOTP");
    }, 500);
    return navigate("/login");
  };

  useEffect(() => {
    let email = localStorage.getItem("recoveryEmail");
    let emailOTP = localStorage.getItem("recoveryOTP");
    let user = localStorage.getItem("user");
    if (email && emailOTP) {
      return undefined;
    } else if (user) {
      return navigate("/");
    } else {
      return navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-[100vh] flex flex-col md:flex-row justify-evenly items-center">
      <ToastContainer />
      <div className="hidden md:block w-1/2 h-full bg-black">
        <div className="h-full w-full grid place-items-center">
          <div>
            <h1 className="text-white text-5xl">Six Sense Mobility</h1>
            <p className="text-gray-400 text-right mt-1 mr-1">
              company tagline here
            </p>
          </div>
        </div>
      </div>

      {/* right side singup section */}
      <section className="md:bg-gray-50 dark:bg-gray-900 w-full md:w-1/2 bg-black text-white h-full">
        <h3 className="text-center text-3xl font-semibold mt-20 md:hidden">
          Six Sense Mobility
        </h3>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-10 md:mt-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add new password
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {/* password  */}
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
                {/* confirm password  */}
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    name="floating_password2"
                    id="floating_password2"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_password2"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm Password
                  </label>
                </div>
                <button type="submit" className="w-full btn">
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account ?{" "}
                  <Link
                    onClick={() => {
                      localStorage.clear("email");
                      localStorage.clear("emailOTP");
                    }}
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecoverPassword;
