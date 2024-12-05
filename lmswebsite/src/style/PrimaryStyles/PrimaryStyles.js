import styled from "styled-components";
 
// Define color variables for easy reuse
const colors = {
  primary: "#ff0080", // Pink
  heading: "#333333", // Dark gray for headings
  subheading: "#555555", // Light gray for subheadings
  bodyText: "#666666", // Gray for text
  cardBackground: "#f9f9f9", // Light gray for card background
  buttonActiveBackground: "#ff0080",
  buttonDefaultBackground: "#fff",
  buttonHoverBackground: "#ff0080",
};
 
// Container for study materials
export const StudyMaterialsContainer = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
`;
 
// Heading
export const Heading = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${colors.heading};
  position: relative;
 
  @media (max-width: 768px) {
    font-size: 28px; /* Slightly smaller for tablets */
  }
 
  @media (max-width: 480px) {
    font-size: 24px; /* Even smaller for mobile */
  }
`;
 
// Underline below the heading
export const HeadingUnderline = styled.div`
  width: 100px;
  height: 4px;
  background-color: ${colors.primary};
  margin: 8px auto 0;
`;
 
// Class buttons container
export const ClassButtons = styled.div`
  margin-top: 20px;
`;
 
// Single class button
export const ClassButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? colors.buttonActiveBackground : colors.buttonDefaultBackground)};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
 
  &:hover {
    background-color: ${colors.buttonHoverBackground};
    color: #fff;
    border-color: ${colors.buttonHoverBackground};
  }
`;
 
// Grid container for materials
export const MaterialsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
`;
 
// Material card
export const MaterialCard = styled.div`
  width: 220px;
  padding: 20px;
  border-radius: 16px;
  background-color: ${colors.cardBackground};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
 
  @media (max-width: 768px) {
    width: 200px; /* Adjust card width for tablets */
  }
 
  @media (max-width: 480px) {
    width: 180px; /* Adjust card width for mobile */
  }
`;
 
// Subheading (For materials or sections under the main heading)
export const Subheading = styled.h2`
  font-size: 28px;
  color: ${colors.subheading};
  font-weight: bold;
 
  @media (max-width: 768px) {
    font-size: 22px; /* Smaller subheading for tablets */
  }
 
  @media (max-width: 480px) {
    font-size: 18px; /* Even smaller for mobile */
  }
`;
 
// Body text or paragraph
export const BodyText = styled.p`
  font-size: 16px;
  color: ${colors.bodyText};
  line-height: 1.6;
 
  @media (max-width: 768px) {
    font-size: 14px; /* Smaller text for tablets */
  }
 
  @media (max-width: 480px) {
    font-size: 12px; /* Even smaller for mobile */
  }
`;