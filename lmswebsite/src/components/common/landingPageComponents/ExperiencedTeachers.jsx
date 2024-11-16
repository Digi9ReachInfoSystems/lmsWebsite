import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Title,
  TeacherCard,
  TeacherRole,
  TeacherInfo,
  ResumeLink,
  NoTeachersMessage,
} from "./ExperiencedTeachers.styles";

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
    <Container>
      <Title>Experienced Teachers</Title>
      {teachersData && teachersData.length > 0 ? (
        teachersData.map((teacher, index) => (
          <TeacherCard key={index}>
            <TeacherRole>{teacher.role}</TeacherRole>
            <TeacherInfo>Experience: {teacher.experience || "N/A"}</TeacherInfo>
            <TeacherInfo>Classes Taught: {teacher.no_of_classes}</TeacherInfo>
            {teacher.resume_link && (
              <ResumeLink href={teacher.resume_link} target="_blank" rel="noopener noreferrer">
                View Resume
              </ResumeLink>
            )}
          </TeacherCard>
        ))
      ) : (
        <NoTeachersMessage>No Experienced Teachers Available</NoTeachersMessage>
      )}
    </Container>
  );
};

export default ExperiencedTeachers;
