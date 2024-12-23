import React from "react";
import HeaderSection from "./NavBar/navbar";
import HeroContent from "./HeroContent/HeroContent";
import Features from "./Features/features";
import MeetOurTeacher from "./Meetourteacher/Meetourteacher";
import AboutPlatform from "./AboutPlatform/AboutPlatform";
import Testimonials from "./Testimonials/Testimonials";
import Faq from "./Faqs/Faq";
import Footer from "./Footer/Footer";
import ChooseUs from "./ChooseUs/ChooseUs";

function LandingPageFinal() {
  return (
    <div>
      {" "}
      <HeaderSection />
      <HeroContent />
      <AboutPlatform />
      <Features />
      <ChooseUs />
      <MeetOurTeacher />
      {/* <Testimonials /> */}
      <Faq />
      <Footer />
    </div>
  );
}

export default LandingPageFinal;
