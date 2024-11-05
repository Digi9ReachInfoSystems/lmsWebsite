import React, { useState } from "react";
import logo from "../../assets/logo.svg"; // Import SVG as an image
// import '../styles/Header.css';  // Import the associated CSS file
import "./Header.css"; // Import the associated CSS file

const Header = () => {
  // State to control dropdown visibility
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isStudyMaterialOpen, setIsStudyMaterialOpen] = useState(false);

  // Toggle dropdown function for courses
  const toggleCoursesDropdown = () => {
    setIsCoursesOpen(!isCoursesOpen);
    setIsStudyMaterialOpen(false); // Close the other dropdown
  };

  // Toggle dropdown function for study material
  const toggleStudyMaterialDropdown = () => {
    setIsStudyMaterialOpen(!isStudyMaterialOpen);
    setIsCoursesOpen(false); // Close the other dropdown
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="The Toppers Academy" className="logo-icon" />{" "}
            {/* Use the SVG as an img */}
          </a>
        </div>
        <nav className="nav-menu">
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
