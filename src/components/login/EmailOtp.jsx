import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToastContainer from "../common/ToastContainer";

const EmailOtp = () => {
  const [num, setNum] = useState(Math.floor(Math.random() * 1000001));
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (OTP.length === 0) {
      return toast.warn("please fill the OTP first");
    }
    if (OTP != num) {
      return toast.warn("please enter a valid OTP");
    }
    localStorage.setItem("emailOTP", OTP);
    navigate("/setPassword");
  };
  const [OTP, setOTP] = useState("");

  const sendEmail = async (email) => {
    let res = await axios.post(
      "https://six-sense-mobility-iot.vercel.app/api/otp",
      {
        email,
        otp: num,
      }
    );
    if (res.status != 200) {
      return toast.error("an error occured!");
    }
    toast.success(`OTP send to ${email}`);
  };

  const resendOTP = () => {
    let email = localStorage.getItem("email");
    if (email) {
      sendEmail(email);
    } else {
      toast.error("an error occured!");
    }
  };

  useEffect(() => {
    let email = localStorage.getItem("email");
    if (email) {
      sendEmail(email);
    }
    if (localStorage.getItem("user")) {
      return navigate("/");
    } else if (email) {
      return undefined;
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
          <img src="./src/assets/SixSenseMobility.png" alt="SixSenseMobility" />
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
                Varify yourself using OTP
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    type="number"
                    id="floating_filled"
                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_filled"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Enter OTP
                  </label>
                </div>
                <button type="submit" className="w-full btn">
                  Varify
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Can't get OTP ?{" "}
                  <span
                    onClick={resendOTP}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                  >
                    Resend OTP
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailOtp;
