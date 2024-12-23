import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackageById } from "../../api/packagesApi";
import {
  Container,
  Header,
  LoadingMessage,
  ErrorMessage,
  // NoPackagesMessage,
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
  BackButton,
} from "./PackageDetailPage.style";
import OneHeader from "../../module/student/pages/demomodeupdate/Mode/oneHeader/oneHeader";
import Footer from "../../Main/Components/Footer/Footer";
import HaveQuestions from "../BatchesDetailPage/BatchesLandingPageComponents/HaveQuestions";

const PackageDetailPage = () => {
  const { packageId } = useParams(); // Get the package ID from the URL parameters
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [packageData, setPackageData] = useState(null); // Package data state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!packageId) {
      setError(new Error("No package ID provided"));
      setLoading(false);
      return;
    }
    getPackageById(packageId)
      .then((data) => {
        setPackageData(data);
        //console.log("Hello namsakara", data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [packageId]);

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error.message}</ErrorMessage>;
  }

  const handlePackageClick = (packageId) => {
    navigate( `/testingPackage/${packageId}`);
  };

  const packageType =
    packageData?.mode === "normal" ? "Basic Plan" : "Premium Plan";

  return (
    <>
      <OneHeader />
      <Container>
        {/* <BackButton onClick={() => navigate(-1)}>Go Back</BackButton> */}
        <Header>Package Details</Header>

        {packageData && (
          <PackageGrid>
            <PackageCard
              key={packageId}
              onClick={() => handlePackageClick(packageId)}
            >
              <div className="packageImage">
                <PackageImage src={packageData.image} alt={packageData.title} />
              </div>

              <PackageMode>{packageType}</PackageMode>
              <PackagePrice>
                {packageData.price}/- <strong className="month">Month</strong>
              </PackagePrice>

              <PackageTitle>{packageData.package_name}</PackageTitle>
              {/* <PackageDescription>{packageData.description}</PackageDescription> */}
              <div className="features">
                <strong>Features:</strong>
                <PackageFeatures>
                  {packageData?.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </PackageFeatures>
              </div>
              <div className="subject">
                <strong>Subjects:</strong>
                <SubjectList>
                  {packageData.subject_id?.map((subject) => (
                    <SubjectItem key={subject._id}>
                      {subject.subject_name}
                    </SubjectItem>
                  ))}
                </SubjectList>
              </div>
            </PackageCard>
          </PackageGrid>
        )}
      </Container>

      <HaveQuestions />
      <Footer />
    </>
  );
};
export default PackageDetailPage;