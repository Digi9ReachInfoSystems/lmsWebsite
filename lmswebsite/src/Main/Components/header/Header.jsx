import React, { useState, useRef, useEffect } from "react";
import logo from "../../../assets/logo.png";
import {
  HeaderContainer,
  Logo,
  NavMenu,
  NavLinks,
  DropdownWrapper,
  HamburgerMenu,
  MobileMenu,
  SignUpButton,
} from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { getBoards } from "../../../api/boardApi";
import { getClassesByBoardId } from "../../../api/classApi";
import { getPackageByClassId } from "../../../api/packagesApi";
 
const Header = () => {
  const navigate = useNavigate();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState({});
  const [packages, setPackages] = useState({});
 
  const [hoveredBoardId, setHoveredBoardId] = useState(null);
  const [hoveredClassId, setHoveredClassId] = useState(null);
 
  const dropdownRef = useRef(null);
 
  // Click outside handler to close the Courses dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsCoursesOpen(false);
        setHoveredBoardId(null);
        setHoveredClassId(null);
      }
    };
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  // Toggle the "Courses" dropdown and fetch boards if not already fetched
  const handleCoursesClick = async (e) => {
    e.preventDefault();
    setIsCoursesOpen((prev) => !prev);
   
    if (boards.length === 0 && !isCoursesOpen) {
      try {
        const fetchedBoards = await getBoards();
        setBoards(fetchedBoards);
      } catch (error) {
        console.error("Failed to fetch boards:", error);
      }
    }
  };
 
  // Handle hover on a board to fetch classes
  const handleBoardMouseEnter = async (boardId) => {
    setHoveredBoardId(boardId);
    if (!classes[boardId]) {
      try {
        const fetchedClasses = await getClassesByBoardId(boardId);
        setClasses((prev) => ({ ...prev, [boardId]: fetchedClasses }));
      } catch (error) {
        console.error(`Failed to fetch classes for board ${boardId}:`, error);
      }
    }
  };
 
  const handleBoardMouseLeave = () => {
    setHoveredBoardId(null);
  };
 
  // Handle hover on a class to fetch packages
  const handleClassMouseEnter = async (classId) => {
    setHoveredClassId(classId);
    if (!packages[classId]) {
      try {
        const fetchedPackages = await getPackageByClassId(classId, "normal"); // Assuming "normal" is the default mode
        const fetchedPackages2 = await getPackageByClassId(classId, "personal");
        setPackages((prev) => ({ ...prev, [classId]: fetchedPackages.concat(fetchedPackages2) }));
      } catch (error) {
        console.error(`Failed to fetch packages for class ${classId}:`, error);
      }
    }
  };
 
  const handleClassMouseLeave = () => {
    setHoveredClassId(null);
  };
 
  // Handle logout functionality
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
 
  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
 
  return (
    <HeaderContainer>
      <Logo>
        <a href="/">
          <img src={logo} alt="The Toppers Academy" className="logo-icon" />
        </a>
      </Logo>
 
      {/* Desktop Navigation Menu */}
      <NavMenu>
        <NavLinks>
          {/* Courses Dropdown */}
          <DropdownWrapper ref={dropdownRef}>
            <a href="#!" onClick={handleCoursesClick}>
              Courses
            </a>
            {isCoursesOpen && boards.length > 0 && (
              <ul className="boards-menu">
                {boards.map((board) => (
                  <li
                    key={board._id}
                    onMouseEnter={() => handleBoardMouseEnter(board._id)}
                    onMouseLeave={handleBoardMouseLeave}
                  >
                    <a href={`/testing/${board._id}`}>{board.name}</a>
                    {hoveredBoardId === board._id && classes[board._id] && (
                      <ul className="classes-menu">
                        {classes[board._id].map((cls) => (
                          <li
                            key={cls._id}
                            onMouseEnter={() => handleClassMouseEnter(cls._id)}
                            onMouseLeave={handleClassMouseLeave}
                          >
                            <a href={`/testingClass/${cls._id}`}>{cls.className}</a>
                            {hoveredClassId === cls._id && packages[cls._id] && (
                              <ul className="packages-menu">
                                {packages[cls._id].map((pkg) => (
                                  <li key={pkg._id}>
                                    <a href={`/testingPackage/${pkg._id}`}>{pkg.package_name}</a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </DropdownWrapper>
 
          {/* Study Material Dropdown (if needed) */}
          <DropdownWrapper>
            <a href="#!">Study Material</a>
            {/* Implement similar nested structure if required */}
          </DropdownWrapper>
 
          {/* Other Navigation Links */}
          <li><a href="#!">Become a Teacher</a></li>
          <li><a href="#!">Create Your Enrollment</a></li>
          <li><a href="#!">About Us</a></li>
        </NavLinks>
      </NavMenu>
 
      {/* Hamburger Menu for Mobile */}
      <HamburgerMenu onClick={toggleMobileMenu}>
        <span />
        <span />
        <span />
      </HamburgerMenu>
 
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <MobileMenu>
          <NavLinks>
            {/* For mobile, you might want to implement similar dynamic fetching or simplify the menu */}
            <li><a href="#!">Courses</a></li>
            <li><a href="#!">Study Material</a></li>
            <li><a href="#!">Become a Teacher</a></li>
            <li><a href="#!">Create Your Enrollment</a></li>
            <li><a href="#!">About Us</a></li>
          </NavLinks>
        </MobileMenu>
      )}
 
      {/* Logout Button */}
      <SignUpButton onClick={handleLogout}>Logout</SignUpButton>
    </HeaderContainer>
  );
};
 
export default Header;