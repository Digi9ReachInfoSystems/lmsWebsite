import styled from "styled-components";

// Container for the entire package section
export const PackageContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8e7d8;
`;

export const Container = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Container for the first package section
export const Package = styled.div`
  width: 100%;
  max-width: 1200px;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

// Individual card container for each package
export const PackageCard = styled.div`
  width: 300px;
  background-color: #ffffff; /* White background */
  border-radius: 8px; /* Medium border-radius */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  position: relative; /* To position the button inside the card */

  &:hover {
    transform: translateY(-10px);
  }
`;

// Title for the course
export const CourseTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333333; /* Dark gray text color */
  margin-left: 40px;
  margin-bottom: 24px; /* Large margin bottom */
`;

// Name of the package
export const PackageName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333333; /* Dark gray text color */
  margin: 8px 20px; /* Small margin top and bottom */
`;

// Subject or worksheet label
export const Subjects = styled.div`
  font-size: 14px;
  color: #737791; /* Light grayish color */
  margin-left: 20px;
  margin-bottom: 8px; /* Small margin bottom */
`;

// Container for pricing information
export const PriceContainer = styled.div`
  display: flex;
  margin: 8px 0 20px 20px;
  margin-top: 8px; /* Small margin top */
`;

// Original price style
export const Price = styled.span`
  font-size: 16px;
  text-decoration: line-through;
  color: #000000; /* Light gray color */
`;

// New discounted price style
export const NewPrice = styled.span`
  font-size: 18px;
  color: #fa5a7d; /* Pink color */
  margin-left: 10px;
`;

// Buy Now Button styled component
export const BuyNowButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #fa5a7d; /* Pink color */
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
