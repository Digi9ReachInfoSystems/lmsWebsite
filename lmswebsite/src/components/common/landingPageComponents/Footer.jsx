import React from "react";
import {
  FooterContainer,
  FooterContent,
  FooterText,
  FooterButton,
  FooterImageWrapper,
  FooterImage,
} from "./Footer.styles";
import fImage from "../../../icons/LandingPageIcons/f.svg";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          <h2>Have a question? Let's chat!</h2>
          <p>If you are confused or in doubt, feel free</p>
          <p>to contact us. We’ll be happy to help.</p>
          <FooterButton>Contact Us</FooterButton>
        </FooterText>
        <FooterImageWrapper>
          <FooterImage src={fImage} alt="Background design" />
        </FooterImageWrapper>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
