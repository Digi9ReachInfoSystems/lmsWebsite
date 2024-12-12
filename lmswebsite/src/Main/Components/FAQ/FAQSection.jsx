import React, { useState, useEffect } from "react";
import "./FAQSection.css";
import { getAllFAQ } from "../../../api/faq";

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getAllFAQ();
        setFaqs(response.slice(0, 5)); // Limit to 5 FAQs
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []); // Add empty dependency array to run only once

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
