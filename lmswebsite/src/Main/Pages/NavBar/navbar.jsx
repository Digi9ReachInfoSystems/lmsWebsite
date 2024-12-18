import React, { useState, useRef } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Link } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getBoards } from "../../../api/boardApi";
import { getClassesByBoardId } from "../../../api/classApi";
import { getPackageByClassId } from "../../../api/packagesApi";
import { StyledLink, HamburgerMenu, StyledBox } from "./navbar.style";
import schoolIcon from "../../assets/school.png";
import collegeIcon from "../../assets/college.png";
import universityIcon from "../../assets/university.png";
import Logo from "../../../assets/LOGO.png";
import { useNavigate } from "react-router-dom";
function HeaderSection({ scrollToSection }) {
  const scrollToComponent = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [boards, setBoards] = useState({});
  const [classes, setClasses] = useState({});
  const [packages, setPackages] = useState({});
  const [hoveredBoardId, setHoveredBoardId] = useState(null);
  const [hoveredClassId, setHoveredClassId] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for Hamburger toggle

  const handleCategoryMouseEnter = async (category) => {
    setSelectedCategory(category);
    setIsCoursesOpen(true);
    if (!boards[category]) {
      try {
        const fetchedBoards = await getBoards(category);
        setBoards((prev) => ({ ...prev, [category]: fetchedBoards }));
      } catch (error) {
        console.error(`Error fetching boards: ${error}`);
      }
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/selectBoard"); // Navigate to the Select Board page
  };

  const handleBoardMouseEnter = async (boardId) => {
    setHoveredBoardId(boardId);
    if (!classes[boardId]) {
      try {
        const fetchedClasses = await getClassesByBoardId(boardId);
        setClasses((prev) => ({ ...prev, [boardId]: fetchedClasses }));
      } catch (error) {
        console.error(`Error fetching classes: ${error}`);
      }
    }
  };


  const navigate = useNavigate();

  const handleSelectBoard = () => {
    navigate("/selectBoard"); // Navigate to the /class route
  };


  const handleClassMouseEnter = async (classId) => {
    setHoveredClassId(classId);
    if (!packages[classId]) {
      try {
        const fetchedPackages = await getPackageByClassId(classId, "normal");
        setPackages((prev) => ({ ...prev, [classId]: fetchedPackages }));
      } catch (error) {
        console.error(`Error fetching packages: ${error}`);
      }
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#E8F8F5", color: "#333" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "8px",
              "@media (max-width: 768px)": { width: "20px", height: "20px" },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              "@media (max-width: 990px)": { fontSize: "12px" },
              "@media (max-width: 768px)": { lineHeight: "1" },
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#777",
              }}
              sx={{
                fontSize: { xs: "10px!important", md: "10px" }, // Use the sx prop for media queries
              }}
            ></span>
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            gap: 8,
            "@media (max-width: 768px)": { gap: 1 },
          }}
        ></Box>

        <StyledBox
          isMenuOpen={isMenuOpen} // Pass the state to StyledBox
          sx={{
            display: { xs: isMenuOpen ? "flex" : "none", sm: "flex" },
            flexDirection: { xs: "column", sm: "row" },
            position: { xs: "absolute", sm: "static" },
            top: { xs: "60px", sm: "unset" },
            left: 0,
            backgroundColor: { xs: "#fff", sm: "transparent" },
            width: { xs: "100%", sm: "auto" },
            padding: { xs: "10px", sm: 0 },
            zIndex: 2,
          }}
        >
          <StyledLink
            isCoursesOpen={isCoursesOpen}
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <div className="dropdown-button">
              Courses {isCoursesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {isCoursesOpen && (
              <ul className="category-menu">
                {["School", "College", "University"].map((category) => (
                  <li
                    key={category}
                    onMouseEnter={() => handleCategoryMouseEnter(category)}
                    className="categorylist"
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
                    {selectedCategory === category && boards[category] && (
                      <ul className="boards-menu">
                        {boards[category].map((board) => (
                          <li
                            key={board._id}
                            onMouseEnter={() =>
                              handleBoardMouseEnter(board._id)
                            }
                          >
                            <a
                              href={`/pages/BatchesDetailPage/BatchesLandingPage/${board._id}`}
                            >
                              {board.name}
                            </a>
                            {/* {hoveredBoardId === board._id &&
                              classes[board._id] && (
                                <ul className="classes-menu">
                                  {classes[board._id].map((cls) => (
                                    <li
                                      key={cls._id}
                                      onMouseEnter={() =>
                                        handleClassMouseEnter(cls._id)
                                      }
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
                              )} */}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </StyledLink>

          <Link
            href="#"
            underline="none"
            sx={{
              color: "#333",
              fontWeight: "medium",
              display: "flex",
              alignItems: "center",
              "&:hover": { color: "#00a87d" },
              "@media (max-width: 990px)": { fontSize: "12px" },
              "@media (max-width: 768px)": { fontSize: "10px" },
            }}
          >
            Features
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#333",
              fontWeight: "medium",
              display: "flex",
              alignItems: "center",
              "&:hover": { color: "#00a87d" },
              "@media (max-width: 990px)": { fontSize: "12px" },
              "@media (max-width: 768px)": { fontSize: "10px" },
            }}
          >
            Blogs
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#333",
              fontWeight: "medium",
              display: "flex",
              alignItems: "center",
              "&:hover": { color: "#00a87d" },
              "@media (max-width: 990px)": { fontSize: "12px" },
              "@media (max-width: 768px)": { fontSize: "10px" },
            }}
          >
            Testimonials
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#000",
              fontWeight: "medium",
              display: "flex",
              alignItems: "center",
              "&:hover": { color: "#00a87d" },
              "@media (max-width: 990px)": {
                fontSize: "12px",
                marginRight: "10px",
              },
              "@media (max-width: 768px)": {
                fontSize: "10px",
                marginRight: "10px",
              },
            }}
          >
            Contact Us
          </Link>
        </StyledBox>

        {/* Hamburger Menu for Mobile */}
        <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span />
          <span />
          <span />
        </HamburgerMenu>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            "@media (max-width: 990px)": { gap: 2 },
            "@media (max-width: 768px)": { gap: 1 },
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/login")}
            sx={{
              borderColor: "#ccc",
              color: "#333",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": {
                borderColor: "#00a87d",
                background: "#00C897",
                color: "#fff",
              },
              "@media (max-width: 768px)": {
                fontSize: "10px!important",
                marginTop: "10px",
                marginBottom: "10px",
              },
              "@media (max-width: 990px)": {
                fontSize: "10px",
                marginTop: "10px",
                marginBottom: "10px",
              },
            }}
            onClick={handleSelectBoard}
          >
            Log in
          </Button>
          {/* <Button
            variant="contained"
            sx={{
              backgroundColor: "#00C897", // Green button
              color: "#fff",
              textTransform: "none",
              borderRadius: "24px", // Fully rounded edges
              paddingX: 3,
              "&:hover": { backgroundColor: "#00a87d" },
              "@media (max-width: 990px)": { fontSize: "12px" },
              "@media (max-width: 768px)": { paddingX: 2 },
            }}
          >
            Explore
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderSection;
