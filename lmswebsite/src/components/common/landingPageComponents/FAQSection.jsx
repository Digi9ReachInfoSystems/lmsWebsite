import React, { useState } from "react";
import {
  Section,
  Title,
  FAQList,
  FAQItem,
  Question,
  QuestionText,
  ToggleIcon,
  Answer,
  NoFAQsMessage,
} from "./FAQSection.styles";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Section>
      <Title>Frequently Asked Questions</Title>
      <FAQList>
        {faqData && faqData.length > 0 ? (
          faqData.map((faq, index) => (
            <FAQItem key={faq._id.$oid}>
              <Question onClick={() => toggleFAQ(index)}>
                <QuestionText>{faq.question}</QuestionText>
                <ToggleIcon open={openFAQ === index}>
                  {openFAQ === index ? "-" : "+"}
                </ToggleIcon>
              </Question>
              {openFAQ === index && <Answer>{faq.answer}</Answer>}
            </FAQItem>
          ))
        ) : (
          <NoFAQsMessage>No FAQs Available</NoFAQsMessage>
        )}
      </FAQList>
    </Section>
  );
};

const faqData = [
  {
    _id: { $oid: "6718c74bebcbb25de0cf7d8f" },
    question: "What is the return policy?",
    answer: "Please contact admin team",
  },
  {
    _id: { $oid: "6718c92eebcbb25de0cf7d94" },
    question: "What is the return policy?",
    answer:
      "You can return the product within 30 days of purchase in the original packaging.",
  },
  {
    _id: { $oid: "6718c74bebcbb25de0cf7d8f" },
    question: "What is the return policy?",
    answer: "Please contact admin team",
  },
  {
    _id: { $oid: "6718c92eebcbb25de0cf7d94" },
    question: "What is the return policy?",
    answer:
      "You can return the product within 30 days of purchase in the original packaging.",
  },
  {
    _id: { $oid: "6718c74bebcbb25de0cf7d8f" },
    question: "What is the return policy?",
    answer: "Please contact admin team",
  },
  {
    _id: { $oid: "6718c92eebcbb25de0cf7d94" },
    question: "What is the return policy?",
    answer:
      "You can return the product within 30 days of purchase in the original packaging.",
  },
  
  // Add additional FAQs here
];

export default FAQSection;
