import React from "react";
import LMS1 from "../../assets/LMS1.png";
import LMS2 from "../../assets/LMS2.png";
import LMS3 from "../../assets/LMS3.png";
import {
  LMSTitle,
/*************  ✨ Codeium Command ⭐  *************/
/**
 * @function LMS
 * @description Component to render the LMS information on the Teacher Become page.
 * @returns {React.Component} A component that renders the LMS information.
 */
/******  53a6b37a-cb1b-42eb-8617-f10366720a3b  *******/  TeachAtLMSContainer,
  LMSIcon,
  LMSImagesWrapper,
  LMSImage,
  LMSImageTitle,
} from "./LMS.styles";

const LMS = () => {
  return (
    <>
      <LMSTitle>Why teach at LMS ?</LMSTitle>
      <TeachAtLMSContainer>
        <LMSIcon>
          <LMSImagesWrapper>
            <LMSImage src={LMS1} alt="Choose your schedule" />
          </LMSImagesWrapper>
          <LMSImageTitle>Choose teaching hours & schedule based on your preference</LMSImageTitle>
        </LMSIcon>
        <LMSIcon>
          <LMSImagesWrapper>
            <LMSImage src={LMS2} alt="Teach globally" />
          </LMSImagesWrapper>
          <LMSImageTitle>Teach students from all around the world</LMSImageTitle>
        </LMSIcon>
        <LMSIcon>
          <LMSImagesWrapper>
            <LMSImage src={LMS3} alt="Grow professionally" />
          </LMSImagesWrapper>
          <LMSImageTitle>Enhance your skills with professional growth opportunities</LMSImageTitle>
        </LMSIcon>
      </TeachAtLMSContainer>
    </>
  );
};

export default LMS;
