// import React, { useEffect, useState } from "react";

// function ProfileHeader({ data }) {
//   // console.log("lg", data);

//   return (
//     <div className="flex flex-row gap-2 p-2 m-2 rounded-md">
//       <h2 className="text-green-500 font-bold">{data.username}</h2>
//       <img
//         class="w-6 h-6 rounded-full"
//         src={data.image}
//         alt="Rounded avatar"
//       />
//     </div>
    
//   );
// }

// export default ProfileHeader;

import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function ProfileHeader({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
    localStorage.removeItem("loginData")
    localStorage.removeItem("token")
    navigate('/login')
    // You can add logic to clear user data, such as local storage
  };
  const handleCreateArticle =()=>{
    // console.log('create')
    navigate('/create')
  }

  const handleFavourites =()=>{
    // console.log('fav')
    navigate('/favourites')
  }

  const handleProfile =()=>{
    // console.log('profile')
    navigate('/profile')
  }

  return (
    <div className="relative inline-block m-2">
      <button
        onClick={()=>setIsOpen(!isOpen)}
        className="flex flex-row items-center gap-2 p-2 rounded-md hover:bg-gray-300 focus:outline-none"
      >
        <h2 className="text-green-500 font-bold">{data.username}</h2>
        <img
          className="w-6 h-6 rounded-full"
          src={data.image}
          alt="Rounded avatar"
        />
        <RiArrowDropDownLine/>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg">
          <button
            onClick={handleProfile}
            className="flex flex-row gap-1 items-center px-4 py-2 font-bold text-sm text-gray-600 hover:bg-gray-100 w-full text-left"
          >
            <CgProfile /> <span>Profile</span>
          </button>
          <button
            onClick={handleCreateArticle}
            className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-sm text-gray-600 hover:bg-gray-100 w-full text-left"
          >
            <IoCreateOutline/> Create Article
          </button>
          <button
            onClick={handleFavourites}
            className="flex flex-row items-center gap-1 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 w-full text-left"
          >
            <FaHeart/> <span>Favourite Article</span>
          </button><button
            onClick={handleLogout}
            className="flex flex-row items-center gap-1 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 w-full text-left"
          >
            <CiLogout/> <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;

