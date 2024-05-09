import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserData } from "../features/userSlice";
import { Oval } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [userLoginData, setUserLoginData] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginUser = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Please Enter Email");
    }
    if (!password) {
      setPasswordError("Please Enter Password");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (password && !passwordPattern.test(password)) {
      setPasswordError(
        "Must contain an uppercase letter, a number, a symbol and should be atleast 8 characters"
      );
    }

    if (emailPattern.test(email) && passwordPattern.test(password)) {
      setLoggedIn(true);
      try {
        const response = await axios.post(
          "https://api.realworld.io/api/users/login",
          {
            user: {
              email: email,
              password: password,
            },
          }
        );
        if (response.status === 200) {
          console.log("userLogin", response.data.user);
          const data = response.data.user;
          dispatch(addUserData(data));
          const token = response.data.user.token;
          localStorage.setItem("token", token);
          localStorage.setItem("loginData", JSON.stringify(response.data.user));
          navigate("/articles");
        }
      } catch (error) {
        console.error("login request failed", error.message);
        setError("Email or Password is incorrect");
      } finally {
        setLoggedIn(false);
      }
    }
    // console.log('userData',userData)
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;'",.<>?])(?!.*\s).{8,}$/;
    if (password && !passwordPattern.test(password)) {
      setPasswordError(
        "Must contain an uppercase letter, a number, a symbol and should be atleast 8 characters"
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
            Login Page
          </h2>
          <form className="text-center">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={email}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) => handleEmailChange(e)}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                //   setEmailError("");
                // }}
              />
              {emailError && <span className="text-red-500">{emailError}</span>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <div className="flex flex-row gap-1 border rounded-md focus:border-green-500 pr-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  className="w-full px-3 py-2 rounded-md focus:outline-none "
                  onChange={(e) => handlePassChange(e)}
                />
                <span className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </span>
              </div>
              {passwordError && (
                <span className="text-red-500">{passwordError}</span>
              )}
            </div>
            {error && <span className="text-red-500">{error}</span>}
            {loggedIn ? (
              <div className="flex justify-center m-2">
                <Oval
                  visible={true}
                  height="40"
                  width="40"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-green-700 w-full p-3 rounded text-white text-xl my-2"
                onClick={handleLoginUser}
              >
                Login
              </button>
            )}
            {/* <button
              type="submit"
              className="bg-green-700 w-full p-3 rounded text-white text-xl my-2"
              onClick={handleLoginUser}
            >
              Login
            </button> */}
          </form>
          <div className="text-center">
            New User?{" "}
            <span className="text-green-500">
              <Link to="/reg">Register</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
