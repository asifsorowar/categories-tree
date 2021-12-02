import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <NavLink className="link" to={"/"}>
        Home
      </NavLink>
      <NavLink className="link" to={"/add-category"}>
        Add Category
      </NavLink>
    </div>
  );
}

export default Navbar;
