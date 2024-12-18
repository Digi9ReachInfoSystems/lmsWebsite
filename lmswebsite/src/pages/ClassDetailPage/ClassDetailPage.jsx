import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Heading,
  LoadingMessage,
  ErrorMessage,
  NoPackagesMessage,
  PackageGrid,
  PackageCard,
  PackageFeatures,
  PackagePrice,
  PackageMode,
  SubjectList,
  SubjectItem,
  StyledButton,
  PackageItem,
} from "./ClassDetailPage.style";
import { PageContainer } from "../../style/PrimaryStyles/PrimaryStyles";
import HeaderSection from "../../Main/Pages/NavBar/navbar";
import Footer from "../../Main/Pages/Footer/Footer";
import HaveQuestions from "../BatchesDetailPage/BatchesLandingPageComponents/HaveQuestions";
import { getAllTypeOfBatches } from "../../api/typeOfBatchApi";

const ClassDetailPage = () => {
  const [batchTypes, setBatchTypes] = useState([]); // List of batches
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const selectedSubjects = JSON.parse(localStorage.getItem("selectedSubjects"));

  // Static data for features and subjects
  const staticData = [
    {
      id: 1,
      features: [
        "1 user per account",
        "Unlimited events",
        "Registration Form",
        "Email announcements",
        "Integrate webinars",
        "Sales using mobile app",
      ],
      subjects: ["English"],
    },
    {
      id: 2,
      features: ["Same features as Individual", "Plus group learning benefits"],
      subjects: ["Math", "Science"],
    },
    {
      id: 3,
      features: ["More collaborative features", "Custom learning resources"],
      subjects: ["Physics", "Chemistry"],
    },
    {
      id: 4,
      features: ["Ideal for larger groups", "Best value for money"],
      subjects: ["Biology", "History"],
    },
  ];

  useEffect(() => {
    if (!selectedSubjects || selectedSubjects.length === 0) {
      navigate("/"); // Redirect to home if no subjects are selected
      return;
    }

    // Fetch dynamic batch data from API
    const fetchBatchTypes = async () => {
      try {
        const response = await getAllTypeOfBatches(); // Fetch mode and price from API
        setBatchTypes(response); // Response should return mode and price for each batch
      } catch (error) {
        setError("Failed to fetch batch types. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatchTypes();
  }, [navigate, selectedSubjects]);

  const handleEnrollNow = () => {
    navigate("/selectBoard");
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading Packages...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>Error loading packages: {error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <>
      <HeaderSection />
      <PageContainer>
        <PackageItem>Pricing plans</PackageItem>
        <Heading>Packages Details for Class</Heading>
        <PackageItem>
          Simple, transparent pricing that grows with you.
        </PackageItem>

        {batchTypes.length === 0 ? (
          <NoPackagesMessage>
            No Packages found for this class.
          </NoPackagesMessage>
        ) : (
          <PackageGrid>
            {batchTypes.map((batch, index) => {
              // Map batchTypes fetched from the API with static features/subjects
              const staticItem = staticData[index % staticData.length]; // Cycle through static data if API has more items
              return (
                <PackageCard key={batch._id}>
                  <PackageMode>{batch.mode}</PackageMode>
                  <PackagePrice>
                    {batch.price}/- <strong className="month">Month</strong>
                  </PackagePrice>
                  {staticItem.features && staticItem.features.length > 0 && (
                    <div className="Feature">
                      <strong>Features:</strong>
                      <PackageFeatures>
                        {staticItem.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </PackageFeatures>
                    </div>
                  )}
                  {staticItem.subjects && staticItem.subjects.length > 0 && (
                    <div className="subject">
                      <strong>Subjects:</strong>
                      <SubjectList>
                        {staticItem.subjects.map((subject, subjectIndex) => (
                          <SubjectItem key={subjectIndex}>
                            {subject}
                          </SubjectItem>
                        ))}
                      </SubjectList>
                    </div>
                  )}
                  <StyledButton onClick={handleEnrollNow}>
                    Enroll Now
                  </StyledButton>
                </PackageCard>
              );
            })}
          </PackageGrid>
        )}
      </PageContainer>
      <HaveQuestions />
      <Footer />
    </>
  );
};

export default ClassDetailPage;