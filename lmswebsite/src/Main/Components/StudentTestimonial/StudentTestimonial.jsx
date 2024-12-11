import React from "react";
import "./StudentTestimonial.css";

const StudentTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Hamet Atayken",
      handle: "@hamet_atayken",
      review:
        "Pulley's our daily tool to bypass averages and reveal true insights, for the whole team!",
      image: "https://via.placeholder.com/50/FF5733/FFFFFF?text=H",
    },
    {
      id: 2,
      name: "Arlie Duler",
      handle: "@arlie_duler",
      review:
        "Pulley's levels the analytics field for my team, bridging data analysis gaps and uncovering insights that truly shape our marketing strategies.",
      image: "https://via.placeholder.com/50/FFC300/FFFFFF?text=A",
    },
    {
      id: 3,
      name: "Maria Arceutis",
      handle: "@maria_arceutis",
      review:
        "From novice to pro, Pulley has kept our team extraordinary in our marketing game.",
      image: "https://via.placeholder.com/50/DAF7A6/FFFFFF?text=M",
    },
    {
      id: 4,
      name: "Jenny Wilson",
      handle: "@jennywilson",
      review:
        "Pulley's focus, analytics, and tools streamline teamwork and keep us ahead in insights.",
      image: "https://via.placeholder.com/50/900C3F/FFFFFF?text=J",
    },
    {
      id: 5,
      name: "Guy Hawkins",
      handle: "@guyhawkins",
      review:
        "Pulley is a game changer for our team, digging beyond averages and unlocking the strategies that work.",
      image: "https://via.placeholder.com/50/C70039/FFFFFF?text=G",
    },
  ];

  return (
    <section className="student-testimonials">
      {/* Header */}
      <div className="testimonials-header">
        <p className="testimonials-label">📢 Testimonials</p>
        <h2>Public Cheers for Us!</h2>
        <p className="testimonials-subtitle">
          Find out how our users are spreading the word!
        </p>
      </div>

      {/* Testimonial Grid */}
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-avatar">
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <div className="testimonial-content">
              <h4>{testimonial.name}</h4>
              <p className="testimonial-handle">{testimonial.handle}</p>
              <p className="testimonial-review">{testimonial.review}</p>
            </div>
            <button className="close-button">✕</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentTestimonials;
