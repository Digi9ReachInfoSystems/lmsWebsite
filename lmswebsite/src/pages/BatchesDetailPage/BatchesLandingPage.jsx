import React from "react";
import { fetchLandingPageData } from "../../api/landingPageApi";
import ExpertTeachers1 from "../BatchesDetailPage/BatchesLandingPageComponents/BatchesExpertTeachers";
import StudentTestimonial1 from "../BatchesDetailPage/BatchesLandingPageComponents/BatchesStudentTestimonial";
import HaveQuestion from "../BatchesDetailPage/BatchesLandingPageComponents/HaveQuestions.jsx";
import BoardDetailPagee from "../BatchesDetailPage/BatchesLandingPageComponents/BatchesBoardDetailPage";
import LandingBranches from "../BatchesDetailPage/BatchesLandingPageComponents/BatchesLandingPageBanner.jsx";
import Footer from "../../Main/Pages/Footer/Footer.jsx";
import { PageWrapper } from "./BatchesLandingPage.style.js";
import HeaderSection from "../../Main/Pages/NavBar/navbar.jsx";
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
            <HeaderSection />

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

      <BoardDetailPagee />
      {apiData && (
        <>
          <ExpertTeachers1 data={apiData.experienceTeachers} />
          <StudentTestimonial1 data={apiData.testimonials} />
          <HaveQuestion data={apiData.faqs} />
        </>
      )}
      <Footer />
    </PageWrapper>
  );
}
