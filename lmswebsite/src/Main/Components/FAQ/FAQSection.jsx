import React, { useState } from "react";
import "./FAQSection.css";

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How do I get started?",
      answer:
        "When you sign up, you'll start with the Free plan. It's ideal for new teams and allows unlimited team members.",
    },
    {
      question: "What is included in the Free Plan?",
      answer:
        "The Free plan includes core features such as unlimited tasks, teams, and integrations.",
    },
    {
      question: "How do I cancel my membership?",
      answer: "To cancel your membership, go to Account Settings > Billing.",
    },
    {
      question: "How do I transfer my membership to a different account?",
      answer:
        "You can transfer your membership by navigating to the Account Transfer section.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "We offer a 30-day refund policy for any issues with your subscription.",
    },
  ];

  const handleToggle = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      {/* Search Input */}
      <div className="faq-search">
        <input
          type="text"
          placeholder="Search for a question"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* FAQ Cards */}
      <div className="faq-container">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className={`faq-card ${expandedFAQ === index ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => handleToggle(index)}>
                <span>{faq.question}</span>
                <span className="toggle-icon">
                  {expandedFAQ === index ? "×" : "+"}
                </span>
              </div>
              {expandedFAQ === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))
        ) : (
          <p>No FAQs found for your search.</p>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
