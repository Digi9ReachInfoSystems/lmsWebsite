import React, { useState } from "react";
import "./TestimonialsSection.css";
import s1 from "../../../icons/LandingPageIcons/s1.svg";
import s2 from "../../../icons/LandingPageIcons/s2.svg";
import s3 from "../../../icons/LandingPageIcons/s3.svg";

const TestimonialsSection = () => {
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

  const { review, rating = 0, image } = testimonialsData[currentTestimonialIndex];

  return (
    <section className="testimonials-section">
      <h2 className="section-title">Student Testimonials</h2>
      <div className="testimonial-container">
        <button className="nav-btn left-btn" onClick={previousTestimonial}>
          &#8249;
        </button>

        <div className="testimonial-content">
          <img src={image} alt="Student" className="testimonial-image" />
          <p className="testimonial-quote">"{review}"</p>
          <div className="rating-container">
            <span className="rating">{rating}</span>
            <span className="stars">
              {"★".repeat(Math.floor(rating))} {rating % 1 !== 0 && "☆"}
            </span>
          </div>
        </div>

        <button className="nav-btn right-btn" onClick={nextTestimonial}>
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
