import React, { useState } from "react";
import "./FAQSection.css";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={faq._id.$oid} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{faq.question}</h3>
              <span className={`faq-toggle ${openFAQ === index ? "open" : ""}`}>
                {openFAQ === index ? "-" : "+"}
              </span>
            </div>
            {openFAQ === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const faqData = [
  {
    _id: { $oid: "6718c74bebcbb25de0cf7d8f" },
    question: "What is the return policy?",
    answer: "Please contact admin team",
    createdAt: { $date: "2024-10-23T09:52:11.443Z" },
    updatedAt: { $date: "2024-10-23T09:57:47.491Z" },
  },
  {
    _id: { $oid: "6718c92eebcbb25de0cf7d94" },
    question: "What is the return policy?",
    answer:
      "You can return the product within 30 days of purchase in the original packaging.",
    createdAt: { $date: "2024-10-23T10:00:14.670Z" },
    updatedAt: { $date: "2024-10-23T10:00:14.682Z" },
  },
  {
    _id: { $oid: "6718c74bebcbb25de0cf7d8f" },
    question: "What is the return policy?",
    answer: "Please contact admin team",
    createdAt: { $date: "2024-10-23T09:52:11.443Z" },
    updatedAt: { $date: "2024-10-23T09:57:47.491Z" },
  },
  {
    _id: { $oid: "6718c74bebcbb25de0cf7d8f" },
    question: "What is the return policy?",
    answer: "Please contact admin team",
    createdAt: { $date: "2024-10-23T09:52:11.443Z" },
    updatedAt: { $date: "2024-10-23T09:57:47.491Z" },
  },
  {
    _id: { $oid: "6718c74bebcbb25de0cf7d8f" },
    question: "What is the return policy?",
    answer: "Please contact admin team",
    createdAt: { $date: "2024-10-23T09:52:11.443Z" },
    updatedAt: { $date: "2024-10-23T09:57:47.491Z" },
  },
];

export default FAQSection;
