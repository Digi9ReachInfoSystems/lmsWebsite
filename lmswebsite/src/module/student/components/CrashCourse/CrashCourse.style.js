import styled from "styled-components";

// Container for the entire crash course section
export const CrashContainer = styled.div`
  display: flex;
  flex-direction: row; /* Default row direction to align content and image side by side */
  align-items: center;
  justify-content: space-around;
  background-color: #f8f8f8; /* Light background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Title of the crash course section
export const CrashTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20px;
`;

// List of the course details
export const CrashList = styled.ul`
  list-style-type: disc;
  padding: 0;
  margin-right: 20px; /* Adds space between the text and image */
`;

// Each item in the crash course list
export const CrashText = styled.li`
  font-size: 16px;
  color: #666666;
  margin-bottom: 10px;
  line-height: 1.5;
`;

// The Enroll Now button
export const CrashButton = styled.button`
  background-color: #000000; /* Pink color */
  color: #ffffff;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f34d61; /* Darker pink on hover */
  }
`;

// Styled component for the image
export const CrashImage = styled.img`
  max-width: 40%; /* Adjust image size */
  height: auto;
  margin-left: 20px; /* Add spacing between content and image */
`;
