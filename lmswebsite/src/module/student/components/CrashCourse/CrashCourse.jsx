import React from "react";
import Image from "../../assets/PCMBListImage.png"; // Import the image
import {
  CrashContainer,
  CrashTitle,
  CrashList,
  CrashText,
  CrashButton,
  CrashImage, // Import styled component for the image
} from "./CrashCourse.style"; // Import styled components

const CrashCourse = () => {
  return (
    <CrashContainer>
      <div>
        <CrashTitle>Get Advanced Learning Crash course</CrashTitle>
        <CrashList>
          <CrashText>
            Strong foundation in Physics, Chemistry, Math, and Biology basics.
          </CrashText>
          <CrashText>
            Dedicated time commitment for intensive learning.
          </CrashText>
          <CrashText> Focus on competitive exams. </CrashText>
          <CrashText>Study materials and practice papers provided. </CrashText>
          <CrashText>
            Access to online platforms (for virtual sessions).
          </CrashText>
          <CrashText>
            Active participation in doubt-clearing and mock tests.
          </CrashText>
        </CrashList>
        <CrashButton>Enroll Now</CrashButton>
      </div>
      <CrashImage src={Image} alt="Crash Image" />
    </CrashContainer>
  );
};

export default CrashCourse;
