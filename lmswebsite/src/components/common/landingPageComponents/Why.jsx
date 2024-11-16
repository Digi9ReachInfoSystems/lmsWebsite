import React from "react";
import { WhySection, WhyHeading, WhyFeatures, FeatureItem, FeatureIconWrapper, FeatureIcon, HighlightSection, HighlightContent, HighlightButton, HighlightImage, HighlightSubtext, HighlightDescription } from "./Why.styles";
import p1g from "../../../icons/LandingPageIcons/p1g.svg";
import p2o from "../../../icons/LandingPageIcons/p2o.svg";
import p3H from "../../../icons/LandingPageIcons/p3H.svg";
import p4b from "../../../icons/LandingPageIcons/p4b.svg";
import p5g from "../../../icons/LandingPageIcons/p5g.svg";

const Why = () => {
  return (
    <WhySection>
      <WhyHeading>Why Choose us</WhyHeading>

      <WhyFeatures>
        <FeatureItem>
          <FeatureIconWrapper>
            <FeatureIcon src={p1g} alt="Skilled Instructors" />
          </FeatureIconWrapper>
          <h3>Skilled Instructors</h3>
          <p>
            "Learn from skilled instructors who bring expertise and passion to
            help you achieve your academic goals."
          </p>
        </FeatureItem>
        <FeatureItem>
          <FeatureIconWrapper>
            <FeatureIcon src={p2o} alt="Online Classes" />
          </FeatureIconWrapper>
          <h3>Online Classes</h3>
          <p>
            "Join our online classes for expert-led, flexible learning tailored
            to help you succeed, anytime, anywhere!"
          </p>
        </FeatureItem>
        <FeatureItem>
          <FeatureIconWrapper>
            <FeatureIcon src={p3H} alt="Home Assignment" />
          </FeatureIconWrapper>
          <h3>Home Assignment</h3>
          <p>
            "Discover our resource for expert-led courses designed to empower
            students in their academic journey."
          </p>
        </FeatureItem>
        <FeatureItem>
          <FeatureIconWrapper>
            <FeatureIcon src={p4b} alt="Study Material" />
          </FeatureIconWrapper>
          <h3>Study material</h3>
          <p>
            "Explore our comprehensive study materials designed to enhance your
            learning experience and support your academic success!"
          </p>
        </FeatureItem>
      </WhyFeatures>

      <HighlightSection>
        <HighlightContent>
          <h1>Engaged learners. Outstanding results.</h1>
          <HighlightSubtext>
            "Join us—where engaged learners create outstanding results!"
          </HighlightSubtext>
          <HighlightDescription>
            "Unlock your full potential with TOPPER ACADEMY!"
          </HighlightDescription>
          <HighlightDescription>
            Our expert guidance will help you achieve more.
          </HighlightDescription>
          <HighlightDescription>
            Join us today and take the first step towards success.
          </HighlightDescription>
          <HighlightDescription>
            Get free online counseling now!"
          </HighlightDescription>
          <HighlightButton>Learn live</HighlightButton>
        </HighlightContent>
        <HighlightImage>
          <img src={p5g} alt="Student" />
        </HighlightImage>
      </HighlightSection>
    </WhySection>
  );
};

export default Why;
