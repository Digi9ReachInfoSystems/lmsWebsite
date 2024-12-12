import React from "react";
import { Button } from "@nextui-org/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import "./Banner.css";

const Banner = ({ data }) => {
  const statsData = [
    { icon: <AiOutlineUsergroupAdd />, value: "51", label: "Batches" },
    { icon: <FaBookReader />, value: "6", label: "Courses" },
    { icon: <PiStudentBold />, value: "95", label: "Students" },
    { icon: <LiaChalkboardTeacherSolid />, value: "33", label: "Teachers" },
  ];

  return (
    <div className="hero-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Start Learning Today</h1>
          <p className="hero-subtitle">
            Learn and grow with the best resources and instructors. <br />
            The place to learn and grow.
          </p>
          <div className="hero-buttons">
            <Button className="green-button" size="lg" auto>
              Get Started
            </Button>
            <Button color="secondary" size="lg" variant="flat">
              Learn More
            </Button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://th.bing.com/th/id/R.53524cf38d5cdb0660aea452ce77eb9e?rik=L7boYxk1Jaxmng&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2feducation-transparent-background%2feducation-transparent-background-21.png&ehk=IpXVpbYQGSTxxpjABUK9UarAThLKehuiCwseXE5k5Qg%3d&risl=&pid=ImgRaw&r=0"
            alt="Hero Section"
          />
        </div>
      </div>
      <div className="stats-section">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Bottom Curve */}
      <div className="hero-curve">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="curve-svg"
        >
          <path
            fill="#ffff"
            d="M0,192L80,192C160,192,320,192,480,202.7C640,213,800,235,960,224C1120,213,1280,171,1360,149.3L1440,128V320H0Z"
          ></path>
        </svg>
      </div>

      {/* Stats Section */}
    </div>
  );
};

export default Banner;
