import React, { useEffect, useState } from "react";
import "./SingleCoursePerClass.css";

const SingleCoursePerClass = () => {
  const [singleCourseData, setSingleCourseData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/courses/singleCoursePerClass")
      .then((response) => response.json())
      .then((data) => {
        const repeatedData = data.courses[0]
          ? Array(4).fill(data.courses[0])
          : [];
        setSingleCourseData(repeatedData);
      })
      .catch((error) =>
        console.error("Error fetching single course data:", error)
      );
  }, []);

  return (
    <div className="maincontainer">
      <h1 className="heading1">Explore our programs</h1>
      <p className="heading1">
        Discover the many benefits you will enjoy when you{" "}
      </p>
      <p className="heading1">add us to your online platform</p>
      <h3>Grades Class 4 - Class 10</h3>
      <div className="courses-container">
        {singleCourseData.length > 0 ? (
          singleCourseData.map((course, index) => (
            <div className="single-course-section" key={index}>
              <h3>{course.courseTitle}</h3>
              <p>Class Name: {course.className}</p>
              <p>Class Level: {course.classLevel}</p>
              <p>Curriculum: {course.curriculum}</p>
              <p>Price: ${course.coursePrice}</p>
            </div>
          ))
        ) : (
          <p>No Data Available for Single Course Per Class</p>
        )}
      </div>

      <h3>Online Live School Tutions</h3>
      <div className="courses-container">
        {singleCourseData.length > 0 ? (
          singleCourseData.map((course, index) => (
            <div className="single-course-section" key={index}>
              <h3>{course.courseTitle}</h3>
              <p>Class Name: {course.className}</p>
              <p>Class Level: {course.classLevel}</p>
              <p>Curriculum: {course.curriculum}</p>
              <p>Price: ${course.coursePrice}</p>
            </div>
          ))
        ) : (
          <p>No Data Available for Single Course Per Class</p>
        )}
      </div>

      <h3>Class 11 - Class 12</h3>
      <h3>JEE-NEET</h3>
      <div className="courses-container">
        {singleCourseData.length > 0 ? (
          singleCourseData.map((course, index) => (
            <div className="single-course-section" key={index}>
              <h3>{course.courseTitle}</h3>
              <p>Class Name: {course.className}</p>
              <p>Class Level: {course.classLevel}</p>
              <p>Curriculum: {course.curriculum}</p>
              <p>Price: ${course.coursePrice}</p>
            </div>
          ))
        ) : (
          <p>No Data Available for Single Course Per Class</p>
        )}
      </div>
    </div>
  );
};

export default SingleCoursePerClass;
