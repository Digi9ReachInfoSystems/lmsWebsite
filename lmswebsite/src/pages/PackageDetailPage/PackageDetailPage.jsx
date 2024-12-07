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
        console.log("Hello namsakara",data);
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
    navigate(`/testingPackage/${packageId}`);
  };

  return (
    <Container>
         <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
         <Header>Package Details</Header>

      {packageData && (
        <PackageGrid>
          <PackageCard
          key={packageId} onClick={() => handlePackageClick(packageId)}>
            <PackageTitle>{packageData.package_name}</PackageTitle>
            <PackageImage src={packageData.image} alt={packageData.title} />
            <PackageDescription>
                {packageData?.features?.map((feature,index) => (
                  <li key={index}>{feature}</li>
                ))}
            </PackageDescription>
<PackageDescription>
    {packageData.description}
</PackageDescription>
            <PackageFeatures>
              <SubjectList>
                {packageData.subject_id?.map((subject) => (
                  <SubjectItem key={subject._id}>{subject.subject_name}</SubjectItem>
                ))}
              </SubjectList>
            </PackageFeatures>
            <PackagePrice>${packageData.price}</PackagePrice>
            <PackageMode>{packageData.mode}</PackageMode>
          </PackageCard>
        </PackageGrid>
      )}

     
    </Container>
      )
  

  };
export default PackageDetailPage;