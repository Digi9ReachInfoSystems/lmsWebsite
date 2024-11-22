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
import { useLocation } from "react-router-dom";
import PaymentComponent from "../../components/PaymentComponent/PaymentComponet";

const StudentCourseDetailsPage = () => {
  const location = useLocation();
  console.log("location", location);
  return (
    <>
      <Header />
      <div style={{ position: "relative" }}>
        <HeaderContainer bgImage={location.state.data.image} />
        <BackgroundOverlay />
        <PCMBHeaderWrapper>
          {/* Title Circle positioned behind the main title */}
          <TitleCircle />
          <HeaderText>
            <Title>{location.state.data.package_name}</Title>
            <Subtitle>
            {location.state.data.description}
              Ace your exams with expert guidance. <br /> Build a strong
              foundation for a successful career!
            </Subtitle>
            {/* <EnrollButton>Enroll Now */}
                       
              <PaymentComponent 
               studentId={location.state.studentId} packageId={location.state.data._id} amount={location.state.data.price} />
            {/* </EnrollButton> */}
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
