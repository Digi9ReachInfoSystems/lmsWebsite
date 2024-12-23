import React, { useState } from "react";
import "./Faq.css";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "1. Do I need any prior experience or knowledge to join?",
      answer:
        "No prior experience is required! Our coaching programs are designed for individuals at all skill levels, and our coaches tailor their approach based on your current knowledge and goals.",
    },
    {
      question: "2. How long are the coaching programs?",
      answer:
        "Our coaching programs vary in length depending on the course and package you choose. Some are short-term (a few weeks), while others may extend over several months. You’ll be able to choose a plan that suits your needs.",
    },
    {
      question: "3. How are the coaching sessions delivered?",
      answer:
        "Coaching sessions are delivered through a combination of live virtual meetings, recorded video lessons, and online resources. You’ll also have access to written materials and assignments to enhance your learning experience.",
    },
    {
      question: "4. What if I need more personalized attention?",
      answer:
        "We offer one-on-one coaching for those who need more tailored, intensive support. Our coaches are here to provide you with the attention and guidance you need to succeed.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions (FAQs)</h2>
      <div className="faq-search">
        <input
          type="text"
          placeholder="Describe your issue"
          className="faq-input"
        />
        <button className="faq-search-button">Search</button>
      </div>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(index)}>
              <h3>{faq.question}</h3>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
