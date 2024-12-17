import React, { useRef } from "react";
import { fetchLandingPageData } from "../../api/landingPageApi";
import Header from "../Components/header/Header";
import Banner from "../Components/Banner/Banner";
import Benefits from "../Components/Benefits/Benefits";
import ExploreMaterial from "../Components/ExploreMaterial/ExploreMaterial";
import ChooseUs from "../Components/ChooseUs/ChooseUs";
import ExpertTeachers from "../Components/ExpertTeachers/ExpertTeachers";
import StudentTestimonial from "../Components/StudentTestimonial/StudentTestimonial";
import FAQSection from "../Components/FAQ/FAQSection";
import Footer from "../Components/Footer/Footer";
import HaveQuestion from "../../pages/BatchesDetailPage/BatchesLandingPageComponents/HaveQuestions";

export default function LandingHome() {
  const [apiData, setApiData] = React.useState();

  // Step 1: Create refs for sections
  const exploreMaterialRef = useRef(null);
  const chooseUsRef = useRef(null);
  const teachersRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);
  const benefits = useRef(null);

  // Fetch API Data
  React.useEffect(() => {
    const apiCaller = async () => {
      const response = await fetchLandingPageData();
      setApiData(response);
    };
    apiCaller();
  }, []);

  return (
    <>
      {/* Pass refs to Header */}
      <Header
        scrollToSection={{
          benefits,
          exploreMaterialRef,
          chooseUsRef,
          teachersRef,
          testimonialsRef,
          faqRef,
        }}
      />
      {apiData && (
        <>
          <Banner data={apiData} />
          <div ref={benefits}>
            <Benefits data={apiData.benefits} />
          </div>

          <div ref={exploreMaterialRef}>
            <ExploreMaterial data={apiData.courses} />
          </div>
          <div ref={chooseUsRef}>
            <ChooseUs data={apiData.chooseUs} />
          </div>
          <div ref={teachersRef}>
            <ExpertTeachers data={apiData.experienceTeachers} />
          </div>
          <div ref={testimonialsRef}>
            <StudentTestimonial data={apiData.testimonials} />
          </div>
          <div ref={faqRef}>
            <FAQSection data={apiData.faqs} />
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
