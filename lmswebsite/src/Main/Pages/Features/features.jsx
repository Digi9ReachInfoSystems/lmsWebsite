import React from "react";
import "./features.css"; // Ensure you apply the correct CSS

function Features() {
  const features = [
    {
      number: "01",
      title: "Sign Up",
      description:
        "Browse through our coaching programs and select the one that fits your goals. Signing up is quick and easy—simply create an account, choose your package, and you're ready to start.",
    },
    {
      number: "02",
      title: "Personalized Assessment",
      description:
        "We’ll begin with an initial consultation to assess your needs and goals. This helps us tailor a coaching plan that works for you, ensuring you get the most value from your time with us.",
    },
    {
      number: "03",
      title: "Start Learning",
      description:
        "Dive into your coaching program! You’ll have access to all the materials, sessions, and resources you need.",
    },
    {
      number: "04",
      title: "Get Ongoing Support",
      description:
        "You’re never alone in your journey. We’ll be there to guide and support you every step of the way, with regular check-ins and feedback to help you stay on track.",
    },
  ];

  return (
    <div className="features-section">
      <h2 className="section-title">How it Works</h2>
      <p className="section-description">
        We are providing tailored coaching solutions.
      </p>

      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-box">
            <div className="feature-number">{feature.number}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
