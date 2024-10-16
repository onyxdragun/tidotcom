import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Socials from "./Socials";

const Navigation = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      <button
        className="nav__toggle"
        onClick={toggleMenu}
      >
        {isOpen ? 'X' : '☰'}
      </button>
      <div className={`nav__links ${isOpen ? "nav__links--open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? ' nav__link nav__link--active' : 'nav__link'} end
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'} end
          onClick={() => setIsOpen(false)}
        >
          Gallery
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'} end
          onClick={() => setIsOpen(false)}
        >
          Services
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'} end
          onClick={() => setIsOpen(false)}
        >
          Blog
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'} end
          onClick={() => setIsOpen(false)}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'} end
          onClick={() => setIsOpen(false)}
        >
          Contact
        </NavLink>
        <Socials />
      </div>
    </nav >
  );
};

export default Navigation;