import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Link,
  Drawer,
} from "@mui/material";
import { Form, Input, Alert } from "antd";
import Lottie from "lottie-react";

import CloseIcon from "@mui/icons-material/Close";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getBoards } from "../../../api/boardApi";
import { getClassesByBoardId } from "../../../api/classApi";
import { getPackageByClassId } from "../../../api/packagesApi";
import { StyledLink, HamburgerMenu, StyledBox } from "./navbar.style";
import schoolIcon from "../../assets/school.png";
import collegeIcon from "../../assets/college.png";
import universityIcon from "../../assets/university.png";
import Logo from "../../../assets/Logofinal.png";
import { useNavigate } from "react-router-dom";
import { getStudentByAuthId } from "../../../api/studentApi";
import { getTeacherByAuthId } from "../../../api/teacherApi";
import { auth } from "../../../config/firebaseConfig";
import { getUserByAuthId } from "../../../api/userApi";
import { signInWithEmailAndPassword } from "firebase/auth";
import animationData from "../../../../src/assets/Login.json";
// import { Link } from "react-router-dom";

function HeaderSection({ scrollToSection }) {
  const scrollToComponent = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the landing page
  };

  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [boards, setBoards] = useState({});
  const [classes, setClasses] = useState({});
  const [packages, setPackages] = useState({});
  const [hoveredBoardId, setHoveredBoardId] = useState(null);
  const [hoveredClassId, setHoveredClassId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (values) => {
    const { email, password } = values;
    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      localStorage.setItem(
        "sessionData",
        JSON.stringify({ accessToken: user.accessToken })
      );

      const profileData = await getUserByAuthId(user.uid);

      const sessionData = {
        userId: user.uid,
        accessToken: user.accessToken,
        refreshToken: profileData.user.refresh_token,
        name: profileData.user.name,
        loggedIn: "true",
      };
      console.log("profileData", profileData);

      localStorage.setItem("sessionData", JSON.stringify(sessionData));

      if (profileData.user.role === "admin") navigate("/admin");
      else if (profileData.user.role === "student") {
        const studentData = await getStudentByAuthId(user.uid);
        console.log(" login studentData", studentData);

        if (
          studentData.student.custom_package_status == "no_package" &&
          studentData.student.is_paid == false
        ) {
          navigate("/student");
        } else {
          navigate("/student/dashboard");
        }
        // navigate("/student");
      } else if (profileData.user.role === "teacher") {
        const teacherData = await getTeacherByAuthId(profileData.user.auth_id);
        console.log(" login teacherData", teacherData);
        if (teacherData.teacher) {
          navigate("/teacher/dashboard");
        } else {
          navigate("/teacher");
        }
        // navigate("/teacher");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsSubmitting(false);
  };
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

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
      <Toolbar
        sx={{
          // display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box>
          <img
            src={Logo}
            alt="Logo"
            onClick={handleLogoClick}
            style={{
              width: "120px",
              height: "80px",
              // marginRight: "8px",
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
            href="/blogs"
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
            href="/ContactUs"
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
            // onClick={() => navigate("/login")}
            onClick={toggleDrawer(true)}
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
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          width="30vw"
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{
              maxWidth: 400,
              width: "25vw",
              mx: "auto", // center horizontally
              p: { xs: 2, sm: 3 },
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
            }}
          >
            {/* Title + sub-link */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2, // margin-bottom
                pt: 3, // padding-top
                pb: 3, // padding-bottom
                color: "#00C897", // Change this to your desired color
                fontFamily: "Nunito",
                textAlign: "center", // Center-align text if needed
              }}
            >
              Login
            </Typography>
            {/* ... Drawer Header ... */}

            <Form onFinish={handleLogin}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              {errorMessage && <Alert message={errorMessage} type="error" />}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  style={{
                    background: "#00C897",
                    borderColor: "#00C897",
                    textTransform: "none",
                    color: "#fff",
                    width: "100%",
                  }}
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              </Box>
            </Form>
            <Box
              sx={{
                width: "100%",
                mt: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Lottie animationData={animationData} />
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderSection;
