import React from "react";
import { Link } from "react-router-dom"; // Use this if you're using React Router
import img from "../../assets/404notfound.svg";
import { media } from "../../style/theme/theme";



const PageNotFound = () => {
  // Styles with media queries
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      textAlign: "center",
      color: "#343a40",
      padding: "0 20px",
    },
    heading: {
      fontSize: "6rem",
      color: "#6a11cb",
      margin: "0",
    },
    text: {
      fontSize: "1.5rem",
      margin: "20px 0",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      background: "#6a11cb",
      color: "#fff",
      textDecoration: "none",
      fontSize: "1rem",
      borderRadius: "5px",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      background: "#6a11cb",
    },
    illustration: {
      maxWidth: "400px",
      margin: "20px auto",
    },
    image: {
      width: "100%",
    },
    mediaQuery: {
      "@media (max-width: 768px)": {
        heading: {
          fontSize: "3rem",
        },
        text: {
          fontSize: "1.2rem",
        },
        button: {
          padding: "8px 16px",
          fontSize: "0.9rem",
        },
      },
      "@media (max-width: 480px)": {
        heading: {
          fontSize: "1rem",
        },
        text: {
          fontSize: "0.6rem",
        },
        button: {
          padding: "6px 12px",
          fontSize: "0.4rem",
        },
      },
    },
  };

  // Apply media queries manually for supported styles
  const applyMediaQuery = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      return {
        heading: styles.mediaQuery["@media (max-width: 768px)"].heading,
        text: styles.mediaQuery["@media (max-width: 768px)"].text,
        button: styles.mediaQuery["@media (max-width: 768px)"].button,
      };
    }
    if (width <= 480) {
      return {
        heading: styles.mediaQuery["@media (max-width: 480px)"].heading,
        text: styles.mediaQuery["@media (max-width: 480px)"].text,
        button: styles.mediaQuery["@media (max-width: 480px)"].button,
      };
    }
    return {}; // No changes for larger screens
  };

  const responsiveStyles = applyMediaQuery();

  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.heading, ...responsiveStyles.heading }}>404</h1>
      <p style={{ ...styles.text, ...responsiveStyles.text }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <div style={styles.illustration}>
        <img
          src={img}
          alt="404 Illustration"
          style={styles.image}
        />
      </div>
      <Link
        to="/"
        style={{ ...styles.button, ...responsiveStyles.button }}
        onMouseOver={(e) => (e.target.style.background = "#6a11cb")}
        onMouseOut={(e) => (e.target.style.background = "#6a11cb")}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;