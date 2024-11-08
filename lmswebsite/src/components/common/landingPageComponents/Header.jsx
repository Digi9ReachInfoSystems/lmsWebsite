import React, { useState } from "react";
import logo from "../../../icons/LandingPageIcons/logo.svg";
import "./Header.css";

const Header = () => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isStudyMaterialOpen, setIsStudyMaterialOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleCoursesDropdown = () => {
    setIsCoursesOpen(!isCoursesOpen);
    setIsStudyMaterialOpen(false);
  };

  const toggleStudyMaterialDropdown = () => {
    setIsStudyMaterialOpen(!isStudyMaterialOpen);
    setIsCoursesOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="The Toppers Academy" className="logo-icon" />
          </a>
        </div>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <nav className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li className="dropdown">
              <a href="#!" onClick={toggleCoursesDropdown}>
                Courses
              </a>
              {isCoursesOpen && (
                <ul className="dropdown-content">
                  <li>
                    <a href="/">Course 1</a>
                  </li>
                  <li>
                    <a href="/">Course 2</a>
                  </li>
                  <li>
                    <a href="/">Course 3</a>
                  </li>
                </ul>
              )}
            </li>
            <li className="dropdown">
              <a href="#!" onClick={toggleStudyMaterialDropdown}>
                Study Material
              </a>
              {isStudyMaterialOpen && (
                <ul className="dropdown-content">
                  <li>
                    <a href="/">Material 1</a>
                  </li>
                  <li>
                    <a href="/">Material 2</a>
                  </li>
                  <li>
                    <a href="/">Material 3</a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a href="/">Become a Teacher</a>
            </li>
            <li>
              <a href="/">Create Your Enrollment</a>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
          </ul>
        </nav>
        
        <div className="auth-buttons">
          <button className="sign-in">Sign In</button>
          <button className="sign-up">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
