import React from 'react'
import "../styles/header.css";
import "../styles/gs.css";
import logoimg from "../assets/sslogocrop.png";
import { useNavigate } from "react-router-dom";

function Getstarted() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className='gsmain'>
     <div className='gssub'>
       <img className='logoimg' src={logoimg} alt="logo" />
       <div>
        <button onClick={handleClick}>GET STARTED</button> 
       </div>
          
     </div>
       
         
      
     
    </div>
  )
}

export default Getstarted