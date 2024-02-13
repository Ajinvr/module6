import React, { useState, useEffect,createContext } from 'react';
import "../styles/header.css";
import logoimg from "../assets/sslogo.png";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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

  return (
    <header className="headermain">
      <img className="mainimg" src={logoimg} alt="logo" />
       <div className="headermaintext">
        {menuVisible ? (
          <DropdownButton id="dropdown-basic-button" title="">
          <Dropdown.Item href="#/action-3"> YOUR FILE ID'S</Dropdown.Item>
        </DropdownButton>
        ) : (
          <>
             <h5>FILE ID'S</h5>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
