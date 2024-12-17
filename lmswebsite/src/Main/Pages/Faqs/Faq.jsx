import React, { useState } from "react";
import "./Faq.css";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How can I accept credit cards online?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec suspendisse in felis nulla dolor, egestas odio risus.",
    },
    {
      question: "Is there a limit on how many products I can add?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac nisl a dolor varius placerat.",
    },
    {
      question: "Do you ship abroad?",
      answer:
        "Yes, we ship to most countries. Please check our shipping policy for more details.",
    },
    {
      question: "How long will it take to receive my order?",
      answer:
        "Delivery time depends on your location and the shipping method chosen. Typically, it takes 3-7 business days.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
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
