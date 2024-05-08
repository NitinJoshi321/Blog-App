import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addUserData } from "../features/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [error,setError] = useState("")
  // const [userLoginData, setUserLoginData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLoginUser = async(e) => {
    e.preventDefault();

    if(!email){
      setEmailError('Please Enter Email')
    }
    if(!password){
      setPasswordError('Please Enter Password')
    }
    if(!email || !password){
      return
    }
    
    try{
      const response = await axios.post('https://api.realworld.io/api/users/login',{
        user : {
          email:email,
          password:password
        }
      })
      if(response.status === 200){
        console.log('userLogin',response.data.user)
        const data = response.data.user
        dispatch(addUserData(data))
        const token = response.data.user.token
        localStorage.setItem('token',token)
        localStorage.setItem('loginData',JSON.stringify(response.data.user))
        navigate('/articles')
      }
    }catch(error){
      console.error('login request failed',error.message)
      setError("Email or Password is incorrect")
    }
    // console.log('userData',userData)
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('')
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
                  setPasswordError('')
                }}
              />
              {passwordError && (
                <span className="text-red-500">{passwordError}</span>
              )}
            </div>
            {error && (
                <span className="text-red-500">{error}</span>
              )}
            <button
              type="submit"
              className="bg-green-700 w-full p-3 rounded text-white text-xl my-2"
              onClick={handleLoginUser}
            >
              Login
            </button>
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
