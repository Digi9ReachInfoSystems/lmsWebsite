import React, { useState, useRef, useEffect } from "react";
import logo from "../../../assets/LOGO.png";
import schoolIcon from "../../../Main/assets/school.png";
import collegeIcon from "../../../Main/assets/college.png";
import universityIcon from "../../../Main/assets/university.png";
import {
  HeaderContainer,
  Logo,
  NavMenu,
  NavLinks,
  DropdownWrapper,
  HamburgerMenu,
  MobileMenu,
  SignUpButton,
  SignUpButton1,
} from "./Header.styles";
import { Drawer } from "antd";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getBoards } from "../../../api/boardApi";
import { getClassesByBoardId } from "../../../api/classApi";
import { getPackageByClassId } from "../../../api/packagesApi";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const Header = ({ scrollToSection }) => {
  const {
    exploreMaterialRef,
    chooseUsRef,
    teachersRef,
    testimonialsRef,
    faqRef,
  } = scrollToSection;

  const scrollToComponent = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navigate = useNavigate();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState({});
  const [packages, setPackages] = useState({});
  const [hoveredBoardId, setHoveredBoardId] = useState(null);
  const [hoveredClassId, setHoveredClassId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const toggleDrawer = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCategoryMouseEnter = async (category) => {
    setSelectedCategory(category);
    if (!boards[category]) {
      try {
        const fetchedBoards = await getBoards(category);
        setBoards((prev) => ({ ...prev, [category]: fetchedBoards }));
      } catch (error) {
        console.error(`Failed to fetch boards for ${category}:`, error);
      }
    }
    setIsCoursesOpen(true);
  };

  const handleCategoryMouseLeave = () => {
    setSelectedCategory(null);
    setIsCoursesOpen(false);
  };

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

  const handleClassMouseEnter = async (classId) => {
    setHoveredClassId(classId);
    if (!packages[classId]) {
      try {
        const fetchedPackages = await getPackageByClassId(classId, "normal");
        const fetchedPackages2 = await getPackageByClassId(classId, "personal");
        setPackages((prev) => ({
          ...prev,
          [classId]: fetchedPackages.concat(fetchedPackages2),
        }));
      } catch (error) {
        console.error(`Failed to fetch packages for class ${classId}:`, error);
      }
    }
  };

  const handleClassMouseLeave = () => {
    setHoveredClassId(null);
  };

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

      <NavMenu>
        <NavLinks>
          <DropdownWrapper
            ref={dropdownRef}
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={handleCategoryMouseLeave}
            isCoursesOpen={isCoursesOpen}
          >
            <div className="dropdown-button">
              Courses{" "}
              {isCoursesOpen ? (
                <IoIosArrowUp className="arrowicon" />
              ) : (
                <IoIosArrowDown className="arrowicon" />
              )}
            </div>
            {isCoursesOpen && (
              <ul className="category-menu">
                {["School", "College", "University"].map((category) => (
                  <li
                    key={category}
                    onMouseEnter={() => handleCategoryMouseEnter(category)}
                    className="category-item"
                    style={{ marginTop: "20px" }}
                  >
                    <span className="categorylink">
                      {category === "School" && (
                        <img src={schoolIcon} alt="School" className="img" />
                      )}
                      {category === "College" && (
                        <img src={collegeIcon} alt="College" className="img" />
                      )}
                      {category === "University" && (
                        <img
                          src={universityIcon}
                          alt="University"
                          className="img"
                        />
                      )}
                      {category}
                    </span>
                    {selectedCategory === category &&
                      boards[category] &&
                      boards[category].length > 0 && (
                        <ul className="boards-menu">
                          {boards[category].map((board) => (
                            <li
                              key={board._id}
                              onMouseEnter={() =>
                                handleBoardMouseEnter(board._id)
                              }
                              onMouseLeave={handleBoardMouseLeave}
                            >
                              <a
                                href={`/pages/BatchesDetailPage/BatchesLandingPage/${board._id}`}
                              >
                                {board.name}
                              </a>
                              {hoveredBoardId === board._id &&
                                classes[board._id] && (
                                  <ul className="classes-menu">
                                    {classes[board._id].map((cls) => (
                                      <li
                                        key={cls._id}
                                        onMouseEnter={() =>
                                          handleClassMouseEnter(cls._id)
                                        }
                                        onMouseLeave={handleClassMouseLeave}
                                      >
                                        <a href={`/testingClass/${cls._id}`}>
                                          {cls.className}
                                        </a>
                                        {hoveredClassId === cls._id &&
                                          packages[cls._id] && (
                                            <ul className="packages-menu">
                                              {packages[cls._id].map((pkg) => (
                                                <li key={pkg._id}>
                                                  <a
                                                    href={`/testingPackage/${pkg._id}`}
                                                  >
                                                    {pkg.package_name}
                                                  </a>
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
                  </li>
                ))}
              </ul>
            )}
          </DropdownWrapper>
          <li>
            <a href="#!">Become a Teacher</a>
          </li>
          <li>
            <a onClick={() => scrollToComponent(exploreMaterialRef)}>
              Explore Packages
            </a>
          </li>
          <li>
            <a onClick={() => scrollToComponent(chooseUsRef)}>Why Choose Us</a>
          </li>
          <li>
            <a onClick={() => scrollToComponent(teachersRef)}>Teachers</a>
          </li>
          <li>
            <a onClick={() => scrollToComponent(testimonialsRef)}>
              Testimonials
            </a>
          </li>
          <li>
            <a onClick={() => scrollToComponent(faqRef)}>FAQ's</a>
          </li>
        </NavLinks>
      </NavMenu>

      {/* Hamburger Menu for Mobile */}
      <HamburgerMenu onClick={toggleDrawer}>
        <MenuOutlined style={{ fontSize: "24px", color: "black" }} />
      </HamburgerMenu>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={() => setIsMobileMenuOpen(false)}
        visible={isMobileMenuOpen}
        closeIcon={<CloseOutlined />}
        width={250}
      >
        <MobileMenu>
          <NavLinks>
            <li>
              <a onClick={() => scrollToComponent(exploreMaterialRef)}>
                Explore Packages
              </a>
            </li>
            <li>
              <a onClick={() => scrollToComponent(chooseUsRef)}>
                Why Choose Us
              </a>
            </li>
            <li>
              <a onClick={() => scrollToComponent(teachersRef)}>Teachers</a>
            </li>
            <li>
              <a onClick={() => scrollToComponent(testimonialsRef)}>
                Testimonials
              </a>
            </li>
            <li>
              <a onClick={() => scrollToComponent(faqRef)}>FAQ's</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </NavLinks>
        </MobileMenu>
      </Drawer>

      <SignUpButton onClick={() => navigate("/login")}>Login</SignUpButton>
      <SignUpButton1 onClick={() => navigate("/signup")}>Sign-Up</SignUpButton1>
    </HeaderContainer>
  );
};

export default Header;
