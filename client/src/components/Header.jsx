import React, { useState, useEffect} from 'react';
import "../styles/header.css";
import logoimg from "../assets/sslogo.png";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';


function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMenuVisible(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();
  

  const handleClickhome = () => {
    navigate("/home");
  };

  return (
    <header className="headermain">
      <img className="mainimg" src={logoimg} alt="logo" />
       <div className="headermaintext">
        {menuVisible ? (
          <DropdownButton id="dropdown-basic-button" title="">
          <Dropdown.Item onClick={handleClickhome}>HOME</Dropdown.Item>
        </DropdownButton>
        ) : (
          <>
             <h5 onClick={handleClickhome}>HOME</h5>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
