import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExperiencedTeachers.css";

const ExperiencedTeachers = () => {
  const [teachersData, setTeachersData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/teachers/experience/greater")
      .then((response) => {
        console.log("API Response:", response.data);
        setTeachersData(response.data.teachers || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Experienced Teachers</h2>
      {teachersData && teachersData.length > 0 ? (
        teachersData.map((teacher, index) => (
          <div key={index} className="teacher-cards">
            <h3>{teacher.role}</h3>
            <p>Experience: {teacher.experience || "N/A"}</p>
            <p>Classes Taught: {teacher.no_of_classes}</p>
            {teacher.resume_link && (
              <a
                href={teacher.resume_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No Experienced Teachers Available</p>
      )}
    </div>
  );
};

export default ExperiencedTeachers;
