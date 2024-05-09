import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // console.log("email", email);
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!userName) {
      setUsernameError("Please Enter Username");
    }
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
    // console.log("password", passwordPattern.test(password));

    if (
      !email ||
      !userName ||
      !password ||
      !emailPattern.test(email) ||
      !passwordPattern.test(password)
    ) {
      return;
    }
    // console.log("registered");
    const userData = {
      username: userName,
      email: email,
      password: password,
    };
    console.log(userData);

    try {
      const response = await axios.post(
        "https://api.realworld.io/api/users",
        { user: userData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User registered successfully:", response.data.user);
      setIsRegistered(true);
      setTimeout(() => setIsRegistered(false), 1000);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error.response.data.errors);
      // console.error("Error registering user:", error.response.data.errors.email);
      // console.error("Error registering user:", error.response.data.errors.username);
      if (error.response && error.response.status === 422) {
        setError("Email or Password has already been taken");
      }
    }
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
          {isRegistered ? (
            <div className="text-center text-green-600 font-bold">
              Succesfully Registered
            </div>
          ) : (
            ""
          )}
          <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
            Registration Page
          </h2>
          <form className="text-center">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                name="name"
                value={userName}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) => {
                  setUserName(e.target.value);
                  setUsernameError("");
                }}
              />
              {usernameError && (
                <span className="text-red-500">{usernameError}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && <span className="text-red-500">{emailError}</span>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={password}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <span className="text-red-500">{passwordError}</span>
              )}
            </div>
            {error && <span className="text-red-500">{error}</span>}
            <button
              type="submit"
              className="bg-green-700 w-full p-3 rounded text-white text-xl my-2"
              onClick={handleRegisterUser}
            >
              Register
            </button>
          </form>
          <div className="text-center">
            Already a User?{" "}
            <span className="text-green-500">
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

