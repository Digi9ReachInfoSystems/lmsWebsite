import React from "react";
import { TeachersSectionContainer, SectionTitle, SectionSubtitle, TeachersGrid, TeacherCard, TeacherImage, TeacherInfo, TeacherName, TeacherSubject, TeacherExperience, TeacherAvailability, TeacherLanguage } from './TeachersSection.styles'; 

const teachersData = [
  {
    image: "https://firebasestorage.googleapis.com/v0/b/lmseducationplaform.appspot.com/o/profile%2F49be5222-791e-4d2c-8561-e9fd84ff75b4.jpg?alt=media",
    name: "John Doe",
    experience: "5 years",
    subject: "Maths",
    availability: "9 AM - 5 PM",
    language: "English",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/lmseducationplaform.appspot.com/o/profile%2F49be5222-791e-4d2c-8561-e9fd84ff75b4.jpg?alt=media",
    name: "Jane Smith",
    experience: "7 years",
    subject: "Physics",
    availability: "10 AM - 6 PM",
    language: "English",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/lmseducationplaform.appspot.com/o/profile%2F49be5222-791e-4d2c-8561-e9fd84ff75b4.jpg?alt=media",
    name: "Alex Green",
    experience: "6 years",
    subject: "Chemistry",
    availability: "8 AM - 4 PM",
    language: "English",
  },
];

const TeachersSection = () => {
  return (
    <TeachersSectionContainer>
      <SectionTitle>Learn from expert teachers</SectionTitle>
      <SectionSubtitle>"Learn from the Best, Achieve the Greatest"</SectionSubtitle>
      
      <TeachersGrid>
        {teachersData.map((teacher, index) => (
          <TeacherCard key={index}>
            <TeacherImage src={teacher.image} alt={teacher.name} />
            <TeacherInfo>
              <TeacherName>{teacher.name}</TeacherName>
              <TeacherSubject>{teacher.subject}</TeacherSubject>
              <TeacherExperience>{teacher.experience}</TeacherExperience>
              <TeacherAvailability>{teacher.availability}</TeacherAvailability>
              <TeacherLanguage>{teacher.language}</TeacherLanguage>
            </TeacherInfo>
          </TeacherCard>
        ))}
      </TeachersGrid>
    </TeachersSectionContainer>
  );
};

export default TeachersSection;
