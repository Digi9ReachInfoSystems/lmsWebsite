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
          <div key={index} className="faq-item">
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
    question: "What is The Toppers Academy?",
    answer:
      "The Toppers Academy is an online learning platform for students preparing for various competitive exams.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll in a course by visiting our Courses page, selecting a course, and clicking on the enrollment button.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, UPI, and net banking options.",
  },
  {
    question: "Can I access study materials offline?",
    answer:
      "Yes, you can download study materials to access them offline at any time.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes, we offer a refund within 7 days of enrollment if you are not satisfied with the course.",
  },
];

export default FAQSection;
