import React, { useEffect } from "react";
import "./ChooseUs.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

function ChooseUs() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  const features = [
    {
      icon: "https://isolveglobal.eu/wp-content/uploads/2021/03/iSolve-Europe-Digital-Banking-Onboarding-Solution.png", // Replace with actual icon path
      title: "Easy Onboarding",
      description:
        "Just a Few steps to start with and select Course of your choice",
      animation: "fade-up", // AOS animation type
    },
    {
      icon: "https://quickbooks.intuit.com/oidam/intuit/sbseg/en_us/Blog/Graphic/how-to-choose-a-pricing-strategy-header-image-us-en.png",
      title: "Best Pricing Out there",
      description: "Cost Efficient pricing for your learning needs",
      animation: "fade-right",
    },
    {
      icon: "https://img.freepik.com/free-vector/teacher-character-collection_23-2148517110.jpg",
      title: "Quality Teachers ",
      description:
        "We hire the Best teachers out there and help to provide the best learning experience",
      animation: "fade-left",
    },
    {
      icon: "https://static.vecteezy.com/system/resources/previews/011/684/830/non_2x/e-learning-online-education-and-workshop-icon-elements-knowledge-for-success-business-training-and-better-ideas-bookstore-remote-training-classes-service-and-academic-graduation-free-png.png",
      title: "Recordings Access",
      description:
        "Access The recording whenever and wherever you want of your classes.",
      animation: "fade-up",
    },
  ];

  return (
    <div>
      <div className="heading">
        <h2>FEATURES & BENEFITS</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <div className="choose-us-section">
        <div className="features-container">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              data-aos={feature.animation} // AOS animation type
              data-aos-delay={index * 200} // Optional: stagger animations
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="feature-icon"
              />
             </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href="#readmore" className="read-more">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
