import React from "react";
import {
  HeaderContainer,
  PCMBHeaderWrapper,
  HeaderText,
  Title,
  Subtitle,
  EnrollButton,
  GirlImage,
  BackgroundOverlay,
  TitleCircle,
} from "./StudentCourseDetailsPage.style";

import Header from "../../components/Header/Header";
import PCMBBackgroundImage from '../../assets/PCMB-background.jpg'; // Ensure this path is correct
import GirlImageSrc from "../../assets/PCMB-Header-image.png"; // Ensure this path is correct
import PCMBPackage from "../../components/PCMBPackage/PCMBPackage";
import CrashCourse from "../../components/CrashCourse/CrashCourse";
import ExpertTeachers from "../../components/ExpertTeachers/ExpertTeachers";
import StudentTestimonials from "../../components/StudentTestimonials/StudentTestimonials";

const StudentCourseDetailsPage = () => {
  return (
    <>
      <Header />
      <div style={{ position: "relative" }}>
        <HeaderContainer bgImage={PCMBBackgroundImage} />
        <BackgroundOverlay />
        <PCMBHeaderWrapper>
          {/* Title Circle positioned behind the main title */}
          <TitleCircle />
          <HeaderText>
            <Title>PCMB</Title>
            <Subtitle>
              Ace your exams with expert guidance. <br /> Build a strong
              foundation for a successful career!
            </Subtitle>
            <EnrollButton>Enroll Now</EnrollButton>
          </HeaderText>
          <GirlImage src={GirlImageSrc} alt="Girl with books" />
        </PCMBHeaderWrapper>
      </div>
      <PCMBPackage />
      <CrashCourse />
      <ExpertTeachers />
      <StudentTestimonials />
    </>
  );
};

export default StudentCourseDetailsPage;
