import React from "react";
import { fetchLandingPageData } from "../../api/landingPageApi";
import Header from "../../Main/Components/header/Header"; // Import Header component
// import Banner from "../../Components/Banner/Banner";
// import Benefits from "../Components/Benefits/Benefits";
// import ExploreMaterial from "../Components/ExploreMaterial/ExploreMaterial";
// import ChooseUs from "../Components/ChooseUs/ChooseUs";
import ExpertTeachers1 from "../BatchesDetailPage/BatchesLandingPageComponents/BatchesExpertTeachers";
import StudentTestimonial1 from "../BatchesDetailPage/BatchesLandingPageComponents/BatchesStudentTestimonial";
// import FAQSection from "../../Components/FAQ/FAQSection"; // Import FAQSection
// import HaveQuestion from "./HaveQuestion.style"; 
import HaveQuestion from "../BatchesDetailPage/BatchesLandingPageComponents/HaveQuestions.jsx";
// import Footer from "../../Components/Footer/Footer"; // Import Footer component
import BoardDetailPagee from "../BatchesDetailPage/BatchesLandingPageComponents/BatchesBoardDetailPage";
import LandingBranches from "../BatchesDetailPage/BatchesLandingPageComponents/BatchesLandingPageBanner.jsx";
import Footerbatch from "../BatchesDetailPage/BatchesLandingPageComponents/BatchFooter";
import { PageWrapper } from "./BatchesLandingPage.style.js"; 
export default function LandingHome() {
  const [apiData, setApiData] = React.useState();

  React.useEffect(() => {
    const apiCaller = async () => {
      const response = await fetchLandingPageData();
      setApiData(response);
    };
    apiCaller();
  }, []);

  return (
    <PageWrapper>
      <Header /> 
      {apiData && (
        <>
          <LandingBranches
            data={{
              banners: apiData.banners,
              stats: apiData.stats,
            //   courses: apiData.courses,
            }}
          />
          </>
        )}

{/* <LandingBranches/> */}
    <BoardDetailPagee/>
      {apiData && (
        <>
          {/* <Benefits data={apiData.benefits} /> */}
          {/* <ExploreMaterial data={apiData.courses} /> */}
          {/* <ChooseUs data={apiData.chooseUs} /> */}
          <ExpertTeachers1 data={apiData.experienceTeachers} />
          <StudentTestimonial1 data={apiData.testimonials} />
          {/* <FAQSection data={apiData.faqs} /> Passing FAQ data */}
          <HaveQuestion data={apiData.faqs} /> 
        </>
      )}
      {/* <Footer />  */}
      <Footerbatch/>
      </PageWrapper>
  );    
}




