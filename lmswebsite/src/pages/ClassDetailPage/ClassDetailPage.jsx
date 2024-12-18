import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackageByClassId } from "../../api/packagesApi";
import {
  Container,
  Heading,
  LoadingMessage,
  ErrorMessage,
  NoPackagesMessage,
  PackageGrid,
  PackageCard,
  PackageTitle,
  PackageImage,
  PackageDescription,
  PackageFeatures,
  PackagePrice,
  PackageMode,
  SubjectList,
  SubjectItem,
  PackageItem,
  StyledButton,
} from "./ClassDetailPage.style";
import {
  PageContainer,
  PrimaryButton,
} from "../../style/PrimaryStyles/PrimaryStyles";
import Navbar from "../../Main/Pages/NavBar/navbar"
// import Header from "../../Main/Components/header/Header";
import Footer from "../../Main/Components/Footer/Footer";
import HaveQuestions from "../BatchesDetailPage/BatchesLandingPageComponents/HaveQuestions";

const ClassDetailPage = () => {
  const { classId } = useParams(); // Get the class ID from the URL parameters
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [packagesError, setPackagesError] = useState(null);
  const mode = "normal"; // Default mode for fetching packages

  useEffect(() => {
    if (!classId) {
      setPackagesError(new Error("No class ID provided"));
      setLoadingPackages(false);
      return;
    }

    const fetchPackages = async () => {
      try {
        const packagesData = await getPackageByClassId(classId, "normal");
        const packagesData2 = await getPackageByClassId(classId, "personal");
        setPackages(packagesData.concat(packagesData2));
        setLoadingPackages(false);
      } catch (error) {
        setPackagesError(error);
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, [classId, mode]);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loadingPackages) {
    return (
      <Container>
        <LoadingMessage>Loading Packages...</LoadingMessage>
      </Container>
    );
  }

  if (packagesError) {
    return (
      <Container>
        <ErrorMessage>
          Error loading Packages: {packagesError?.message}
        </ErrorMessage>
      </Container>
    );
  }

  const handleButtonClick = () => {
    navigate("/signup");
  };

  return (
    <>
    <Navbar/>
      <PageContainer>
        <PackageItem>Pricing plans</PackageItem>
        <Heading>Packages Details for Class</Heading>
        <PackageItem>
          Simple, transparent pricing that grows with you.
        </PackageItem>

        {packages.length === 0 ? (
          <NoPackagesMessage>
            No Packages found for this class.
          </NoPackagesMessage>
        ) : (
          <PackageGrid>
            {packages.map((pkg) => {
              // Determine package type based on mode
              const packageType =
                pkg.mode === "normal" ? "Basic Plan" : "Premium Plan";

              return (
                <PackageCard key={pkg._id}>
                  <PackageMode>{packageType}</PackageMode>
                  <PackagePrice>
                    {pkg.price}/- <strong className="month">Month</strong>
                  </PackagePrice>
                  <PackageTitle>{pkg.package_name}</PackageTitle>
                  {pkg.features && pkg.features.length > 0 && (
                    <div className="Features">
                      <strong>Features:</strong>
                      <PackageFeatures>
                        {pkg.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </PackageFeatures>
                    </div>
                  )}

                  {pkg.subject_id && pkg.subject_id.length > 0 && (
                    <div className="subject">
                      <strong>Subjects:</strong>
                      <SubjectList>
                        {pkg.subject_id.map((subject) => (
                          <SubjectItem key={subject._id}>
                            {subject.subject_name}
                          </SubjectItem>
                        ))}
                      </SubjectList>
                    </div>
                  )}

                  <StyledButton onClick={handleButtonClick}>
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