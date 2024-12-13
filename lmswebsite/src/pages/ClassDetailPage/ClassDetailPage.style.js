import { theme } from "../../style/theme/theme";

import styled from "styled-components";

// Container for the entire page
export const Container = styled.div`
  padding: 20px;
  width: 80%;
  margin: 0 auto;
`;

// Header for the page
export const Heading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

// Loading message
export const LoadingMessage = styled.div`
  font-size: 1.2em;
  text-align: center;
  color: #555;
`;

// Error message
export const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
`;

// No packages message
export const NoPackagesMessage = styled.div`
  font-size: 1.2em;
  text-align: center;
  color: #777;
  margin: 20px 0;
`;

// Grid for package cards
export const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 90%;
  margin: auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

// Individual package card
export const PackageCard = styled.div`
  background-color: #fff;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  gap: 50px;
`;

// Package title
export const PackageTitle = styled.h2`
  margin: 0 0 10px 0;
  color: #2c3e50;
  text-align: center;
`;

// Package image
export const PackageImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

// Package description
export const PackageDescription = styled.p`
  color: #555;
  width: 80%;
  margin: 10px auto;
`;

// Package features
export const PackageFeatures = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  color: #555;
  margin-left: 75px;
  margin-top: -25px;
  height: 130px;
  overflow: scroll;
  scrollbar-width: none;
`;

// Package price
export const PackagePrice = styled.p`
  color: #000;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;

  .month {
    font-size: 24px;
  }
`;

// Package mode
export const PackageMode = styled.p`
  color: ${theme.colors.pink4};
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

// Subjects list within a package
export const SubjectList = styled.ul`
  list-style-type: circle;
  padding-left: 20px;
  color: #555;
  margin-left: 75px;
  margin-top: -25px;
  height: 130px;
  overflow: scroll;
  scrollbar-width: none;
`;

// Individual subject item
export const SubjectItem = styled.li`
  margin-bottom: 5px;
`;

// Back button
export const BackButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #2980b9;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  background: ${theme.colors.pink4};
  color: ${theme.colors.white};
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
`;

export const PackageItem = styled.p`
  font-size: 14px;
  padding: 20px;
  text-align: center;
`;
