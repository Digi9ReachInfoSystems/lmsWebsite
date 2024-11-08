import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

const Banner = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const fallbackBannerImage =
        "https://firebasestorage.googleapis.com/v0/b/lmseducationplaform.appspot.com/o/44c95419-42cb-4ce6-a40f-abf0a9ab12cd.jpg?alt=media";

    const dummyCourses = Array.from({ length: 5 }, () => ({
        _id: "6700e52d1d1807f7c3f53bdb",
        title: "Course Title",
        class: "615f8a774b20c234b37b6010",
        price: 1100,
        __v: 0,
    }));

    const dummyStats = {
        totalTeachers: 5,
        totalStudents: 3,
        totalCourses: 6,
    };

    return (
        <div className="bannerContainer1">
            <div className="innerContainer1">
                <div className="wave1"></div>
                <Slider {...sliderSettings}>
                    {data?.banners?.length > 0
                        ? data.banners.map((banner, index) => (
                              <div key={index} className="sliderItem1">
                                  <img
                                      src={banner.banner_image || fallbackBannerImage}
                                      alt={banner.title || "Default Banner Title"}
                                      className="bannerImage1"
                                  />
                                  <p className="bannerText1">
                                      {banner.title || "Default Banner Title"}
                                  </p>
                              </div>
                          ))
                        : Array.from({ length: 5 }).map((_, index) => (
                              <div key={index} className="sliderItem1">
                                  <img
                                      src={fallbackBannerImage}
                                      alt="Default Banner"
                                      className="bannerImage1"
                                  />
                              </div>
                          ))}
                </Slider>

                <div className="Coursesbackground1">
                    <h2 className="Courses1">Popular Courses</h2>
                    <div className="coursesSection1">
                        {data?.courses?.length > 0
                            ? data.courses.map((course) => (
                                  <div key={course._id} className="card1">
                                      <p>{course.price}</p>
                                  </div>
                              ))
                            : dummyCourses.map((course) => (
                                  <div key={course._id} className="card1">
                                      <p>{course.price}</p>
                                  </div>
                              ))}
                    </div>
                </div>

                <div className="statsSection1">
                    {data?.stats ? (
                        <div className="cardContainer1">
                            <div className="cardStatistics1">
                                <p>Total Teachers: {data.stats.totalTeachers}</p>
                            </div>
                            <div className="cardStatistics1">
                                <p>Total Students: {data.stats.totalStudents}</p>
                            </div>
                            <div className="cardStatistics1">
                                <p>Total Courses: {data.stats.totalCourses}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="cardContainer1">
                            <div className="cardStatistics1">
                                <p>Total Teachers: {dummyStats.totalTeachers}</p>
                            </div>
                            <div className="cardStatistics1">
                                <p>Total Students: {dummyStats.totalStudents}</p>
                            </div>
                            <div className="cardStatistics1">
                                <p>Total Courses: {dummyStats.totalCourses}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Banner;
