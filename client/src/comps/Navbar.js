import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/Navbar.css";
import { AiFillInfoCircle, AiFillShopping } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";

const Navbar = () => {
  const navRef = useRef(null);
  const { id } = useParams();

  const handleSidebar = () => {
    navRef.current.classList.toggle("showSidebar");
  };

  return (
    <header className="nav-wrapper">
      <nav>
        <button onClick={handleSidebar}>
          <TiThMenu />
        </button>
        <div className="useful-links">
          <Link to="#">
            <AiFillInfoCircle />
          </Link>
          <Link to={`/user/${id}/cart`}>
            <AiFillShopping />
          </Link>
        </div>
      </nav>
      <div className="sidebar" ref={navRef}>
        <Link to={`/user/${id}/services`} onClick={handleSidebar}>
          Home
        </Link>
        <Link to={`/user/${id}/ntn-registeration`} onClick={handleSidebar}>
          NTN registration
        </Link>
        <Link to={`/user/${id}/aop-registeration`} onClick={handleSidebar}>
          AOP NTN registration
        </Link>
        <Link to={`/user/${id}/aop-registeration`} onClick={handleSidebar}>
          Partnership registration
        </Link>
        <Link to={`/user/${id}/sole-registeration`} onClick={handleSidebar}>
          sole propirieter
        </Link>
        <a href="/">logout</a>
      </div>
    </header>
  );
};

export default Navbar;
