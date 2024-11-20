import React, { useState } from "react";
import {
  TestimonialsSectionWrapper,
  SectionTitle,
  SectionSubtitle,
  TestimonialContainer,
  TestimonialContent,
  TestimonialImage,
  TestimonialQuote,
  RatingContainer,
  Rating,
  Stars,
  LeftBtn,
  RightBtn,
  QuestionSection,
  QuestionTitle,
  QuestionSubtitle,
  QuestionButton,
} from "./StudentTestimonials.style";
import s1 from "../../assets/s1.svg";
import s2 from "../../assets/s2.svg";
import s3 from "../../assets/s3.svg";

const StudentTestimonials = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonialsData = [
    {
      review: "Great course!",
      rating: 5,
      student_id: "6718b90633d29d0586cfecb2",
      image: s1,
    },
    {
      review: "Great course!",
      rating: 1,
      student_id: "6718b90633d29d0586cfecb2",
      image: s3,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const {
    review,
    rating = 0,
    image,
  } = testimonialsData[currentTestimonialIndex];

  return (
    <>
      <TestimonialsSectionWrapper>
        <SectionTitle>Student Testimonials</SectionTitle>
        <SectionSubtitle>
          What our students say about their successful journey with us
        </SectionSubtitle>
        <TestimonialContainer>
          <LeftBtn onClick={previousTestimonial}>&#8249;</LeftBtn>

          <TestimonialContent>
            <TestimonialImage src={image} alt="Student" />
            <TestimonialQuote>"{review}"</TestimonialQuote>
            <RatingContainer>
              <Rating>{rating}</Rating>
              <Stars>
                {"★".repeat(Math.floor(rating))} {rating % 1 !== 0 && "☆"}
              </Stars>
            </RatingContainer>
          </TestimonialContent>

          <RightBtn onClick={nextTestimonial}>&#8250;</RightBtn>
        </TestimonialContainer>
      </TestimonialsSectionWrapper>
      <QuestionSection>
        <QuestionTitle>Have a Question? Let;s ask</QuestionTitle>
        <QuestionSubtitle>
          If you are confused or in doubt, you can free contact us, we will be
          happy to help.
        </QuestionSubtitle>
        <QuestionButton>Enroll Now</QuestionButton>
      </QuestionSection>
    </>
  );
};

export default StudentTestimonials;
