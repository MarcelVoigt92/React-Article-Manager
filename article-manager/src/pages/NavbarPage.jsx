import { Link, NavLink } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <h1>My Articles</h1>
      </Link>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/post">Post Articles</NavLink>
    </nav>
  );
};

export default Navbar;
