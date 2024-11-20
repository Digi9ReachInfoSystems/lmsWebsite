import React from "react";
import Image from "../../assets/CourseImage.png"; // You can replace this with dynamic imports for images if needed
import {
  PackageContainer,
  Container,
  PackageCard,
  Package,
  CourseTitle,
  PackageName,
  Subjects,
  PriceContainer,
  Price,
  NewPrice,
  CardContainer,
  BuyNowButton, // Add the BuyNowButton here
} from "./PCMBPackage.style";

const courses = [
  {
    id: 1,
    name: "LKG",
    worksheet: "WORKSHEET",
    oldPrice: "32,000",
    newPrice: "22,000",
    image: Image,
  },
  {
    id: 2,
    name: "UKG",
    worksheet: "WORKSHEET",
    oldPrice: "35,000",
    newPrice: "25,000",
    image: Image,
  },
  {
    id: 3,
    name: "1st Grade",
    worksheet: "WORKSHEET",
    oldPrice: "40,000",
    newPrice: "30,000",
    image: Image,
  },
];

const PCMBPackage = () => {
  return (
    <>
      <PackageContainer>
        <Package>
          <CourseTitle>PCM Course</CourseTitle>
          <CardContainer>
            {courses.map((course) => (
              <PackageCard key={course.id}>
                <img
                  src={course.image}
                  alt="Worksheets preview"
                  style={{ width: "100%" }}
                />
                <PackageName>{course.name}</PackageName>
                <Subjects>
                  <b>{course.worksheet}</b>
                </Subjects>
                <PriceContainer>
                  <Price>{course.oldPrice}</Price>
                  <NewPrice>
                    <b>{course.newPrice}</b>
                  </NewPrice>
                </PriceContainer>
                <BuyNowButton>Buy Now</BuyNowButton> {/* Add button here */}
              </PackageCard>
            ))}
          </CardContainer>
        </Package>
      </PackageContainer>
      <Container>
        <Package>
          <CourseTitle>PCMB Course</CourseTitle>
          <CardContainer>
            {courses.map((course) => (
              <PackageCard key={course.id}>
                <img
                  src={course.image}
                  alt="Worksheets preview"
                  style={{ width: "100%" }}
                />
                <PackageName>{course.name}</PackageName>
                <Subjects>
                  <b>{course.worksheet}</b>
                </Subjects>
                <PriceContainer>
                  <Price>{course.oldPrice}</Price>
                  <NewPrice>
                    <b>{course.newPrice}</b>
                  </NewPrice>
                </PriceContainer>
                <BuyNowButton>Buy Now</BuyNowButton> {/* Add button here */}
              </PackageCard>
            ))}
          </CardContainer>
        </Package>
      </Container>
      <PackageContainer>
        <Package>
          <CourseTitle>ADVANCED MOCK QUESTION PAPERS</CourseTitle>
          <CardContainer>
            {courses.map((course) => (
              <PackageCard key={course.id}>
                <img
                  src={course.image}
                  alt="Worksheets preview"
                  style={{ width: "100%" }}
                />
                <PackageName>{course.name}</PackageName>
                <Subjects>
                  <b>{course.worksheet}</b>
                </Subjects>
                <PriceContainer>
                  <Price>{course.oldPrice}</Price>
                  <NewPrice>
                    <b>{course.newPrice}</b>
                  </NewPrice>
                </PriceContainer>
                <BuyNowButton>Buy Now</BuyNowButton> {/* Add button here */}
              </PackageCard>
            ))}
          </CardContainer>
        </Package>
      </PackageContainer>
    </>
  );
};

export default PCMBPackage;
