import styled from "styled-components";

export const BlogContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  line-height: 1.6;
  color: #333;

  @media (max-width: 1600px) {
    max-width: 90%;
  }

  @media (max-width: 1200px) {
    max-width: 100%;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 20px 0;

  h1 {
    font-size: 24px;
    margin: 0;
  }

  nav a {
    margin-left: 15px;
    text-decoration: none;
    color: #333;
    font-size: 16px;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    nav a {
      margin-left: 0;
      margin-bottom: 10px;
    }
  }

  @media (max-width: 576px) {
    padding: 15px 0;

    h1 {
      font-size: 20px;
    }

    nav a {
      font-size: 14px;
    }
  }
`;

export const Section = styled.section`
  margin: 20px 0;
  width: ${(props) => (props.isExpanded ? "70%" : "30%")};
  padding: 20px;
  transition: width 0.3s ease;
  cursor: pointer;
  display: inline-block;
  vertical-align: top;

  &:last-of-type {
    margin-bottom: 80px;
  }

  @media (max-width: 1440px) {
    width: ${(props) => (props.isExpanded ? "75%" : "40%")};
  }

  @media (max-width: 992px) {
    width: ${(props) => (props.isExpanded ? "80%" : "50%")};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

export const Quote = styled.blockquote`
  font-style: italic;
  color: #555;
  margin: 20px 0;
  border-left: 4px solid #ccc;
  padding-left: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Paragraph = styled.p`
  font-size: 16px;
  margin: 15px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

export const SubHeading = styled.h2`
  font-size: 20px;
  color: #222;
  margin: 20px 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 576px) {
    gap: 10px;
  }
`;

export const Icon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 576px) {
    font-size: 18px;
  }
`;
