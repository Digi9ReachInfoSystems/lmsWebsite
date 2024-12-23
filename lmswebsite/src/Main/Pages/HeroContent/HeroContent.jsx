import React from "react";
import { Box, Typography, Button } from "@mui/material";
import StatsCard from "./Statscard";
import GroupIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";

function HeroContent() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768; // Define mobile breakpoint

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(270deg, #fff 0%, #fdf2f8 100%)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: { xs: "2rem 1rem", md: "4rem 2rem" },
        zIndex: 1,
        "::before": {
          content: '""',
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "200px",
          height: "200px",
          background: "rgba(106, 17, 203, 0.5)",
          filter: "blur(100px)",
          borderRadius: "50%",
          zIndex: 0,
        },
        "::after": {
          content: '""',
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "300px",
          height: "300px",
          background: "rgba(255, 182, 119, 0.9)",
          filter: "blur(150px)",
          borderRadius: "50%",
          zIndex: 0,
        },
      }}
    >
      {/* SVG Background Curve */}
      <Box
        component="div"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          lineHeight: 0,
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path
            fill="#fff"
            d="M0,256L80,229.3C160,203,320,149,480,160C640,171,800,245,960,240C1120,235,1280,149,1360,106.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </Box>

      {/* Floating Bubbles */}
      {[1, 2, 3, 4].map((_, index) => (
        <Box
          key={`bubble-${index}`}
          sx={{
            position: "absolute",
            width: `${40 + index * 10}px`,
            height: `${40 + index * 10}px`,
            borderRadius: "50%", // Circle
            backgroundColor: ["#26D07C", "#FFB677", "#9EA8FF", "#00C897"][
              index
            ],
            top: `${10 + index * 20}%`,
            left: index % 6 === 0 ? `${20 + index * 20}%` : "auto",
            right: index % 2 !== 0 ? `${5 + index * 5}%` : "auto",
            animation: `floatAnimation ${44 + index}s infinite ease-in-out`,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
            zIndex: -5,
            transition: "transform 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)", // Increase size
              backgroundColor: "#FF4081", // Change color
            },
          }}
        />
      ))}

      {/* Add Squares */}
      {[1, 2].map((_, index) => (
        <Box
          key={`square-${index}`}
          sx={{
            position: "absolute",
            width: `${30 + index * 20}px`,
            height: `${30 + index * 20}px`,
            backgroundColor: ["#F29E4C", "#A8DADC"][index],
            top: `${15 + index * 25}%`,
            left: index % 2 === 0 ? `${85 + index * 10}%` : "auto",
            right: index % 2 !== 0 ? `${35 + index * 10}%` : "auto",
            transform: `rotate(${index * 15}deg)`,
            animation: `floatAnimation ${5 + index}s infinite ease-in-out`,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
            zIndex: 0,
            transition: "transform 0.3s ease, rotate 0.3s ease",
            "&:hover": {
              transform: "scale(1.2) rotate(15deg)", // Scale and rotate on hover
              backgroundColor: "#FF5733", // Change color
            },
          }}
        />
      ))}

      {/* Add Triangles */}
      {[1, 2].map((_, index) => (
        <Box
          key={`triangle-${index}`}
          sx={{
            position: "absolute",
            width: 0,
            height: 0,
            borderLeft: `${20 + index * 10}px solid transparent`,
            borderRight: `${20 + index * 10}px solid transparent`,
            borderBottom: `${30 + index * 10}px solid #A8DADC`,
            top: `${5 + index * 20}%`,
            left: index % 2 === 0 ? `${68 + index * 10}%` : "auto",
            right: index % 2 !== 0 ? `${75 + index * 10}%` : "auto",
            transform: `rotate(${index * 30}deg)`,
            animation: `floatAnimation ${6 + index}s infinite ease-in-out`,
            zIndex: 0,
            transition: "transform 0.3s ease, border-bottom-color 0.3s ease",
            "&:hover": {
              transform: "scale(1.2) rotate(-15deg)", // Scale and rotate in opposite direction
              borderBottomColor: "#FFC300", // Change color
            },
          }}
        />
      ))}

      {/* Left Content */}
      <Box
        sx={{
          flex: "1",
          textAlign: { xs: "center", md: "left" },
          zIndex: 2,
          paddingLeft: { xs: 0, md: "10vw" },
          paddingTop: { xs: "4rem", md: "8rem" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "3rem", md: "5rem" },
            marginBottom: "1rem",
            fontFamily: "Nunito, sans-serif",
            color: "#333",
          }}
        >
          Achieve more with expert Online <br />
          Coaching
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1.5rem", md: "1.8rem" },
            color: "#6c757d",
            fontFamily: "Nunito, sans-serif",
            marginBottom: "2rem",
          }}
        >
          Step up. Learn. Achieve
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#6A11CB", color: "#fff" }}
            onClick={() => navigate("/selectBoard")}
          >
            Enroll as a Student
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/teacher")}
            sx={{ borderColor: "#6A11CB", color: "#6A11CB" }}
          >
            Become a Teacher
          </Button>
        </Box>

        {/* Stats Cards (Conditional Rendering) */}
        {!isMobile && ( // Only render if not on mobile
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            {/* <StatsCard
              title="Total Students"
              value="15K"
              icon={<GroupIcon sx={{ color: "#fff" }} />}
              bgColor="#6A11CB"
            />
            <StatsCard
              title="Active Mentors"
              value="500+"
              icon={<GroupIcon sx={{ color: "#fff" }} />}
              bgColor="#00C897"
            />
            <StatsCard
              title="Total Classes"
              value="8K+"
              icon={<GroupIcon sx={{ color: "#fff" }} />}
              bgColor="#FFB677"
            />
            <StatsCard
              title="Subjects Offered"
              value="100+"
              icon={<GroupIcon sx={{ color: "#fff" }} />}
              bgColor="#FF4081"
            /> */}
          </Box>
        )}
      </Box>

      {/* Right Mockup */}
      <Box
        component="img"
        src="https://firebasestorage.googleapis.com/v0/b/demoproject-6d5cd.appspot.com/o/final%20edit.png?alt=media&token=76c7de42-eade-416d-8823-6f35a57a55bd"
        alt="Mockup"
        sx={{
          width: "90%",
          maxWidth: "700px",
          borderRadius: "12px",
          // Adjust padding top & right based on screen size
          paddingTop: {
            xs: "20px", // Extra-small devices
            sm: "40px", // Small devices
            md: "80px", // Medium devices and larger
          },
          paddingRight: {
            xs: "0px", // Extra-small devices
            sm: "10px", // Small devices
            md: "20px", // Medium devices and larger
          },
        }}
      />
    </Box>
  );
}

export default HeroContent;
