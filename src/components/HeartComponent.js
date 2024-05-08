// import React, { useState } from "react";
// import Heart from "react-animated-heart";

// export default function HeartComponent({value}) {  
//   console.log("value",value)
//   const [count,setCount] = useState(0)

//   const [isClick, setClick] = useState(false);
//   return (
//     <div>
//       <Heart style={{width:'1000px'}} isClick={isClick} onClick={() => {
//         setClick(!isClick)
//         setCount()
//       }} 

//       />
//     </div>
//   );
// }
import { FaHeart } from "react-icons/fa6";
export default function HeartComponent({value}){
  console.log("value",value)
  return(
    <FaHeart style={{fill:'red'}} size={"20px"} />
  )
}
