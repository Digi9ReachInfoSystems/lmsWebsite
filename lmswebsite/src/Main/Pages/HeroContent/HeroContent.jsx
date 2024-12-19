import React from "react";
import { Box, Typography, Button, keyframes } from "@mui/material";
import GroupIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";

// Keyframes for animations
const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const textFadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

function StatsCard({ title, value, icon, bgColor, position }) {
  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        padding: "1rem 1.5rem",
        width: "180px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        animation: `${floatAnimation} 4s ease-in-out infinite`,
        zIndex: 10,
        ...position, // Dynamically apply position styles
      }}
    >
      <Box
        sx={{
          backgroundColor: bgColor,
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{ color: "#6c757d", fontFamily: "Nunito, sans-serif" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

function HeroContent() {
  const navigate = useNavigate();
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Background Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)",
          color: "#fff",
          textAlign: "center",
          padding: "6rem 2rem 4rem",
          position: "relative",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
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
              top: `${10 + index * 15}%`,
              left: index % 2 === 0 ? `${10 + index * 5}%` : "auto",
              right: index % 2 !== 0 ? `${5 + index * 5}%` : "auto",
              animation: `${floatAnimation} ${4 + index}s infinite ease-in-out`,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
              zIndex: 0,
            }}
          />
        ))}

        {/* Hero Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: "1rem",
            fontSize: { xs: "2.5rem", md: "3rem" },
            animation: `${textFadeUp} 1.5s ease-in-out`,
            fontFamily: "Nunito, sans-serif",
          }}
        >
          Your Personalized Learning Journey
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: "2rem",
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            maxWidth: "600px",
            margin: "0 auto",
            animation: `${textFadeUp} 1.8s ease-in-out`,
            fontFamily: "Nunito, sans-serif",
          }}
        >
          Choose your subjects and preferred class sizes – from 1:1 mentorship
          to collaborative group sessions. Learn at your pace, your way.
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Button
            onClick={() => navigate("/selectBoard")}
            variant="contained"
            sx={{
              backgroundColor: "#26D07C",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            Join as Student
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#fff",
              color: "#fff",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            Join As Teacher
          </Button>
        </Box>

        {/* Dashboard Image */}
        <Box
          component="img"
          src="https://static.vecteezy.com/system/resources/previews/000/457/141/original/landing-page-template-of-website-design-illustration-concept-isometric-flat-design-concept-of-web-page-design-for-website-and-mobile-website-vector-illustration.jpg"
          alt="Dashboard Mockup"
          sx={{
            width: "85%",
            maxWidth: "700px",
            margin: "4rem auto 0",
            display: "block",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            animation: `${textFadeUp} 2.5s ease-in-out`,
          }}
        />

        {/* Floating Cards Around Image */}
        <StatsCard
          title="Total Students"
          value="15K"
          icon={<GroupIcon sx={{ color: "#fff" }} />}
          bgColor="#6A11CB"
          position={{ top: "40%", left: "5%" }}
        />
        <StatsCard
          title="Active Mentors"
          value="500+"
          icon={<GroupIcon sx={{ color: "#fff" }} />}
          bgColor="#00C897"
          position={{ top: "40%", right: "5%" }}
        />
        <StatsCard
          title="Total Classes"
          value="8K+"
          icon={<GroupIcon sx={{ color: "#fff" }} />}
          bgColor="#FFB677"
          position={{ bottom: "5%", left: "15%" }}
        />
        <StatsCard
          title="Subjects Offered"
          value="100+"
          icon={<GroupIcon sx={{ color: "#fff" }} />}
          bgColor="#FF4081"
          position={{ bottom: "20%", right: "15%" }}
        />
      </Box>
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
          style={{ width: "100%", height: "150px", display: "block" }}
        >
          <path
            fill="#FFFFFF"
            d="M0,224L80,208C160,192,320,160,480,144C640,128,800,128,960,144C1120,160,1280,192,1360,208L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </Box>
    </Box>
  );
}

export default HeroContent;
