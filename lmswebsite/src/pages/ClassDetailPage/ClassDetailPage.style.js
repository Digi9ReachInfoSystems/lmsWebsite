import { theme } from "../../style/theme/theme";
import styled from "styled-components";

// Container for the entire page
export const Container = styled.div`
  padding: 20px;
  width: 80%;
  margin: 0 auto;

  @media (max-width: 1400px) {
    width: 85%;
  }

  @media (max-width: 1200px) {
    width: 90%;
  }

  @media (max-width: 990px) {
    width: 95%;
  }
`;

// Header for the page
export const Heading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

// Loading message
export const LoadingMessage = styled.div`
  font-size: 1.2em;
  text-align: center;
  color: #555;

  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (max-width: 576px) {
    font-size: 0.9em;
  }
`;

// Error message
export const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;

  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (max-width: 576px) {
    font-size: 0.9em;
  }
`;

// No packages message
export const NoPackagesMessage = styled.div`
  font-size: 1.2em;
  text-align: center;
  color: #777;
  margin: 20px 0;

  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (max-width: 576px) {
    font-size: 0.9em;
  }
`;

// Grid for package cards
export const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 90%;
  margin: auto;

  @media (max-width: 990px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

// Individual package card
export const PackageCard = styled.div`
  background-color: #fff;
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 450px;

  .Feature {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
  }

  .subject {
    display: flex;
    align-items: flex-start;
  }

  @media (max-width: 1200px) {
    width: 300px;
  }

  @media (max-width: 990px) {
    width: 250px;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

// Package title
export const PackageTitle = styled.h2`
  margin: 0 0 10px 0;
  color: #2c3e50;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

// Package features
export const PackageFeatures = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

// Package price
export const PackagePrice = styled.p`
  color: #000;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;

  .month {
    font-size: 20px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

// Package mode
export const PackageMode = styled.p`
  color: #00c897;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

// Subjects list within a package
export const SubjectList = styled.ul`
  list-style-type: circle;
  padding-left: 20px;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

// Individual subject item
export const SubjectItem = styled.li`
  margin-bottom: 5px;
`;

// Styled button for the package
export const StyledButton = styled.button`
  width: 100%;
  background: #00c897;
  color: ${theme.colors.white};
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    background-color: #00c888;
  }

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 1rem;
  }

  @media (max-width: 576px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

// Generic package item text
export const PackageItem = styled.p`
  font-size: 20px;
  margin: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;