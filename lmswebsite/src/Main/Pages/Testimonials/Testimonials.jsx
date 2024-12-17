import React from "react";
import "./Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      name: "Lance Jarvis",
      title: "Customer",
      image:
        "https://i.pinimg.com/originals/83/10/ab/8310ab709f70727b92fa1a6917897c82.jpg", // Replace with the actual image path
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat sapien vitae congue fringilla.",
      color: "#00b894",
    },
    {
      name: "Ericka Lynda",
      title: "Customer",
      image: "https://i.pinimg.com/originals/83/10/ab/8310ab709f70727b92fa1a6917897c82.jpg", // Replace with the actual image path
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat sapien vitae congue fringilla.",
      color: "#6c5ce7",
    },
    {
      name: "Neil Wilford",
      title: "Customer",
      image: "https://i.pinimg.com/originals/83/10/ab/8310ab709f70727b92fa1a6917897c82.jpg", // Replace with the actual image path
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat sapien vitae congue fringilla.",
      color: "#0984e3",
    },
  ];

  return (
    <div className="testimonials-section">
      <h2>Customer reviews</h2>
      <p>What our customers are saying..</p>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card"
            style={{ borderColor: testimonial.color }}
          >
            <div
              className="testimonial-header"
              style={{ backgroundColor: testimonial.color }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
            <h3>{testimonial.name}</h3>
            <div className="social-icons">
              <a href="#facebook" className="social-icon">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#twitter" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#linkedin" className="social-icon">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
