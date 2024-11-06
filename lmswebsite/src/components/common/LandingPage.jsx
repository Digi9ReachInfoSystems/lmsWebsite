import React, { useEffect, useState } from "react";
import { fetchLandingPageData } from "../../api/landingPageApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./landingPageComponents/Header";
import "./LandingPage.css";
import BenefitsSection from "./landingPageComponents/BenefitsSection";
import StudyMaterials from "./landingPageComponents/StudyMaterials";
import SingleCoursePerClass from "./landingPageComponents/SingleCoursePerClass";
import ExperiencedTeachers from "./landingPageComponents/ExperiencedTeachers";
import Choose from "./landingPageComponents/Choose";
import Why from "./landingPageComponents/Why";
import TeachersSection from "./landingPageComponents/TeachersSection";
import FAQSection from "./landingPageComponents/FAQSection";
import Footer from "./landingPageComponents/Footer";
import Footer2 from "./landingPageComponents/Footer2";
import TestimonialsSection from "./landingPageComponents/TestimonialsSection";

const LandingPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landingPageData = await fetchLandingPageData();
        setData(landingPageData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true,
  };

  const styles = {
    coursesSection: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "90%",
      margin: "0 auto",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "5px",
      padding: "20px",
      margin: "10px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#FFB6C1",
      transition: "transform 0.2s",
      flex: "1 1 calc(20% - 20px)",
      maxWidth: "calc(20% - 20px)",
      boxSizing: "border-box",
    },

    statsSection: {
      width: "39%",
      margin: "0 auto",
      padding: "20px",
      marginTop: "-45px",
    },

    cardContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },

    cardStatistics: {
      flex: "1 1 calc(33.33% - 20px)",
      border: "1px solid #ddd",
      borderRadius: "5px",
      padding: "20px",
      margin: "10px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      textAlign: "center",
    },
  };

  return (
    <div>
      <Header />

      <div
        style={{
          margin: "0",
          padding: "0",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "100vh",
            backgroundColor: "#ffcce0",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              width: "100%",
              height: "50vh",
              backgroundColor: "#ff4081",
              clipPath:
                "path('M0,6 C240,320 480,0 720,80 C960,160 1200,64 1440,120 L1440,300 L0,300 Z')",
            }}
          ></div>

          {data?.banners?.length > 0 ? (
            <Slider {...sliderSettings}>
              {data.banners.map((banner, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={banner.banner_image}
                    alt={banner.title}
                    style={{
                      marginLeft: "280px",
                      width: "50%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "cover",
                    }}
                  />
                  <p
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: "#000",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      fontSize: "1.2rem",
                      textAlign: "center",
                      width: "80%",
                    }}
                  ></p>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No Banners Available</p>
          )}

          <div style={{ position: "relative", paddingTop: "50px" }}>
            <div className="Coursesbackground">
              <h2 className="Courses">Popular Courses</h2>
              <div style={styles.coursesSection}>
                {data?.courses?.length > 0 ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} style={styles.card}>
                      <p>{data.courses[0].class}</p>
                      <p>{data.courses[0].price}</p>
                    </div>
                  ))
                ) : (
                  <p>No Courses Available</p>
                )}
              </div>
            </div>
          </div>

          <div style={{ position: "relative", paddingTop: "50px" }}>
            <div style={styles.statsSection}>
              {data?.stats ? (
                <div style={styles.cardContainer}>
                  <div style={styles.cardStatistics}>
                    <p>Total Teachers: {data.stats.totalTeachers}</p>
                  </div>
                  <div style={styles.cardStatistics}>
                    <p>Total Students: {data.stats.totalStudents}</p>
                  </div>
                  <div style={styles.cardStatistics}>
                    <p>Total Courses: {data.stats.totalCourses}</p>
                  </div>
                </div>
              ) : (
                <p>No Stats Available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <BenefitsSection />
      <StudyMaterials />
      <SingleCoursePerClass />
      <Choose />
      <Why />
      <TeachersSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      <Footer2 />
    </div>
  );
};

export default LandingPage;
