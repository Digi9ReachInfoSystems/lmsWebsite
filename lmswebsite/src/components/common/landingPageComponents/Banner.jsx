import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BannerContainer,
  InnerContainer,
  SliderItem,
  BannerImage,
  BannerText,
  CoursesBackground,
  CoursesTitle,
  CoursesSection,
  Card,
  StatsSection,
  CardContainer,
  CardStatistics,
  Wave,
} from "./Banner.styles";

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
    autoplaySpeed: 3000,
    arrows: true,
  };

  const fallbackBannerImage =
    "https://firebasestorage.googleapis.com/v0/b/lmseducationplaform.appspot.com/o/44c95419-42cb-4ce6-a40f-abf0a9ab12cd.jpg?alt=media";

  const dummyCourses = Array.from({ length: 5 }, () => ({
    _id: "6700e52d1d1807f7c3f53bdb",
    title: "PCMB",
    price: 1100,
  }));

  const dummyStats = {
    totalTeachers: 5,
    totalStudents: 3,
    totalCourses: 6,
  };

  return (
    <BannerContainer>
      <InnerContainer>
        <Wave />
        <Slider {...sliderSettings}>
          {data?.banners?.length > 0
            ? data.banners.map((banner, index) => (
                <SliderItem key={index}>
                  <BannerImage
                    src={banner.banner_image || fallbackBannerImage}
                    alt={banner.title || "Default Banner Title"}
                  />
                  <BannerText>
                    {banner.title || "Default Banner Title"}
                  </BannerText>
                </SliderItem>
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <SliderItem key={index}>
                  <BannerImage src={fallbackBannerImage} alt="Default Banner" />
                </SliderItem>
              ))}
        </Slider>

        <CoursesBackground>
          <CoursesTitle>Popular Courses</CoursesTitle>
          <CoursesSection>
            {data?.courses?.length > 0
              ? data.courses.map((course) => (
                  <Card key={course._id}>
                    <p>{course.title}</p>
                    <p>{course.price}</p>
                  </Card>
                ))
              : dummyCourses.map((course) => (
                  <Card key={course._id}>
                    <p>{course.title}</p>
                    <p>{course.price}</p>
                  </Card>
                ))}
          </CoursesSection>
        </CoursesBackground>

        <StatsSection>
          {data?.stats ? (
            <CardContainer>
              <CardStatistics>
                Total Teachers: {data.stats.totalTeachers}
              </CardStatistics>
              <CardStatistics>
                Total Students: {data.stats.totalStudents}
              </CardStatistics>
              <CardStatistics>
                Total Courses: {data.stats.totalCourses}
              </CardStatistics>
            </CardContainer>
          ) : (
            <CardContainer>
              <CardStatistics>
                Total Teachers: {dummyStats.totalTeachers}
              </CardStatistics>
              <CardStatistics>
                Total Students: {dummyStats.totalStudents}
              </CardStatistics>
              <CardStatistics>
                Total Courses: {dummyStats.totalCourses}
              </CardStatistics>
            </CardContainer>
          )}
        </StatsSection>
      </InnerContainer>
    </BannerContainer>
  );
};

export default Banner;
