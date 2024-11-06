import React, { useState } from "react";
import "./TestimonialsSection.css";
import s1 from "../../../icons/LandingPageIcons/s1.svg";
import s2 from "../../../icons/LandingPageIcons/s2.svg";
import s3 from "../../../icons/LandingPageIcons/s3.svg";

const TestimonialsSection = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonialsData = [
    {
      quote:
        "The best part? I wasn't just passively consuming information. You challenged me to think critically, apply my learning, and experiment.",
      author: "Dinesh Narayana",
      course: "B.Tech Computer Science",
      rating: 4.5,
      image: s1,
    },
    {
      quote:
        "This platform provided invaluable insights and hands-on experience that really boosted my confidence.",
      author: "Sneha Gupta",
      course: "MBA Finance",
      rating: 4.7,
      image: s3,
    },
    {
      quote:
        "The instructors are amazing, and the community forum solidified my understanding, making learning engaging.",
      author: "Amit Roy",
      course: "M.Sc Chemistry",
      rating: 4.8,
      image: s2,
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

  // Destructure the current testimonial data, including 'rating'
  const {
    quote,
    author,
    course,
    rating = 0,
    image,
  } = testimonialsData[currentTestimonialIndex];

  return (
    <section className="testimonials-section">
      <h2 className="section-title">Student Testimonials</h2>
      <div className="testimonial-container">
        <button className="nav-btn left-btn" onClick={previousTestimonial}>
          &#8249;
        </button>

        <div className="testimonial-content">
          <img src={image} alt={author} className="testimonial-image" />
          <p className="testimonial-quote">"{quote}"</p>
          <p className="testimonial-author">{author}</p>
          <p className="testimonial-course">{course}</p>
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
