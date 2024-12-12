import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { getStatisticsData } from "../../../api/statsApi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import "./Banner.css";

const Banner = ({ data }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStatisticsData();
        setStats(response);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      icon: <AiOutlineUsergroupAdd />,
      value: stats.totalBatches || 0,
      label: "Batches",
    },
    {
      icon: <FaBookReader />,
      value: stats.totalCourses || 0,
      label: "Courses",
    },
    {
      icon: <PiStudentBold />,
      value: stats.totalStudents || 0,
      label: "Students",
    },
    {
      icon: <LiaChalkboardTeacherSolid />,
      value: stats.totalTeachers || 0,
      label: "Teachers",
    },
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
             <a href="/login" style={{color:"white"}}>Get Started</a>
            </Button>
            {/* <Button color="secondary" size="lg" variant="flat" style={{color:"white"}}>
              Learn More
            </Button> */}
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
      <div className="hero-curve">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            className="curve"
            fill="#f0f9ff" /* Match this with your next section's color */
            d="M0,128L80,138.7C160,149,320,171,480,186.7C640,203,800,213,960,192C1120,171,1280,117,1360,90.7L1440,64V320H0Z"
          ></path>
        </svg>
      </div>

      {/* Stats Section */}
    </div>
  );
};

export default Banner;
