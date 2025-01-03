import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="flex gap-5">
      <NavLink to={"/"} className="text-blue-600 underline">
        Home
      </NavLink>
      <NavLink to={"/breakout"} className="text-blue-600 underline">
        About
      </NavLink>
      <hr className="" />
    </div>
  );
};

export default Navbar;
