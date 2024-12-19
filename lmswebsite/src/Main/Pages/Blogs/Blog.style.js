import styled from "styled-components";

export const BlogContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  line-height: 1.6;
  color: #333;
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
`;

export const Section = styled.section`
  margin: 20px 0;
  width: ${(props) => (props.isExpanded ? "100%" : "30%")};
  padding: 20px;
  transition: width 0.3s ease;
  cursor: pointer;
  display: inline-block;
  vertical-align: top;

  &:last-of-type {
    margin-bottom: 80px;
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
`;

export const Paragraph = styled.p`
  font-size: 16px;
  margin: 15px 0;
`;

export const SubHeading = styled.h2`
  font-size: 20px;
  color: #222;
  margin: 20px 0;
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 20px;
//   justify-content: space-around;
  margin-top: 10px;
`;

export const Icon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: #555;
  &:hover {
    color: #007bff;
  }
`;
