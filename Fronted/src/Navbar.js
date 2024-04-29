// Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/insert" activeClassName="active">Insert</NavLink>
        </li>
        <li>
          <NavLink to="/search" activeClassName="active">Search</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
