import React, { useState } from "react";
import {
  TestimonialContainer,
  Title,
  Subtitle,
  TestimonialList,
  TestimonialCard,
  ProfileImage,
  ClientName,
  Profession,
  TestimonialText,
  DotsContainer,
  Dot,
} from "./BatchesStudentTestimonial.style";

import StudentTestimonialimage1 from "../../../Main/assets/STimage1.jpeg";
import StudentTestimonialimage2 from "../../../Main/assets/STimage2.jpeg";
import StudentTestimonialimage3 from "../../../Main/assets/STimage3.jpeg";

// Rating Component
const Rating = ({ value }) => {
  const fullStar = "★";
  const emptyStar = "☆";
  return (
    <div style={{ color: "#FFD700", fontSize: "1.2em" }}>
      {Array(5)
        .fill()
        .map((_, index) => (index < value ? fullStar : emptyStar))}
    </div>
  );
};

const StudentTestimonial = ({ data }) => {
  const { testimonials = [] } = data;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle visible testimonials (max 3 at a time)
  const visibleTestimonials = testimonials.slice(
    currentSlide,
    currentSlide + 3
  );

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <TestimonialContainer>
      <Title>Student Testimonial</Title>
      <Subtitle>
        A student testimonial can be a powerful tool for attracting new
        students,
      </Subtitle>
      <Subtitle>
        showcasing the value of your program, and building trust with potential
      </Subtitle>
      <Subtitle>applicants.</Subtitle>

      <TestimonialList>
        {visibleTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial._id || index}
            isPink={index % 2 === 1} 
          >
            <ProfileImage
              src={testimonial.image || StudentTestimonialimage1}
              alt={testimonial.name || "Anonymous"}
            />
            <ClientName>{testimonial.name || "Anonymous"}</ClientName>
            <Profession>{testimonial.profession || "Student"}</Profession>
            <Rating value={testimonial.rating || 0} /> {/* Display rating */}
            {/* <TestimonialText>
              {testimonial.review || "This student has not provided a review."}
            </TestimonialText> */}

<TestimonialText isPink={index % 2 === 1}>
    {testimonial.review || "This student has not provided a review."}
  </TestimonialText>
          </TestimonialCard>
        ))}
      </TestimonialList>
      <DotsContainer>
        {Array(Math.ceil(testimonials.length / 3))
          .fill()
          .map((_, index) => (
            <Dot
              key={index}
              active={index === currentSlide}
              onClick={() => handleDotClick(index)}
            />
          ))}
      </DotsContainer>
    </TestimonialContainer>
  );
};

export default StudentTestimonial;
