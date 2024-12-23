import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Typewriter from "react-typewriter-effect";
import StatsCard from "./Statscard";
import GroupIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

function HeroContent() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(270deg, #fff 0%, #fdf2f8 100%)",
        // overflow: "hidden",
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
          ></path>
        </svg>
      </Box>

      {/* Floating Bubbles */}
      {[1, 2, 3, 4].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            width: `${40 + index * 10}px`,
            height: `${40 + index * 10}px`,
            borderRadius: "50%",
            backgroundColor: ["#26D07C", "#FFB677", "#9EA8FF", "#00C897"][
              index
            ],
            top: `${10 + index * 20}%`,
            left: index % 6 === 0 ? `${10 + index * 5}%` : "auto",
            right: index % 2 !== 0 ? `${5 + index * 5}%` : "auto",
            animation: `floatAnimation ${4 + index}s infinite ease-in-out`,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
            zIndex: 0,
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
            fontSize: { xs: "2rem", md: "3rem" },
            marginBottom: "1rem",
            fontFamily: "Nunito, sans-serif",
            color: "#333",
          }}
        >
          Best Platform For Online <br />
          Learning
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" },
            color: "#6c757d",
            fontFamily: "Nunito, sans-serif",
            marginBottom: "2rem",
          }}
        >
          Learn at your own pace.
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

        {/* Stats Cards (Hide on mobile) */}
        <StatsCard
          title="Total Students"
          value="15K"
          icon={<GroupIcon sx={{ color: "#fff" }} />}
          bgColor="#6A11CB"
          position={{
            top: "8%",
            left: "25%",
            "@media(max-width:576px)": { top: "50%" },
          }}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        />
        <StatsCard
          title="Active Mentors"
          value="500+"
          icon={<GroupIcon sx={{ color: "#fff" }} />}
          bgColor="#00C897"
          position={{
            top: "50%",
            right: "5%",
            "@media(max-width:576px)": { top: "46%" },
          }}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        />
        <StatsCard
          title="Total Classes"
          value="8K+"
          icon={<GroupIcon sx={{ color: "#fff" }} />}
          bgColor="#FFB677"
          position={{ bottom: "35%", left: "15%" }}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        />
        <StatsCard
          title="Subjects Offered"
          value="100+"
          icon={<GroupIcon sx={{ color: "#fff" }} />}
          bgColor="#FF4081"
          position={{ bottom: "20%", right: "35%" }}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        />
      </Box>

      {/* Right Mockup */}
      <Box
        sx={{
          flex: "1",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          marginTop: { xs: "2rem", md: 0 },
        }}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/demoproject-6d5cd.appspot.com/o/final%20edit.png?alt=media&token=76c7de42-eade-416d-8823-6f35a57a55bd"
          alt="Mockup"
          style={{
            width: "90%",
            paddingRight: "20px",
            maxWidth: "700px",
            borderRadius: "12px",
            // boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Box>
    </Box>
  );
}

export default HeroContent;
