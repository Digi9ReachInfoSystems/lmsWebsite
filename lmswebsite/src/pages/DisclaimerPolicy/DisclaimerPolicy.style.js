import styled from "styled-components";

// Container for the entire disclaimer policy
export const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
`;

export const DisclaimerHeader = styled.div`
  text-align: center;
  background: blue; /* Horizontal gradient */
  color: white;
  padding: 20px; /* Add padding for better spacing */
  border-radius: 8px; /* Optional: add rounded corners */
`;

// Title for the disclaimer heading
export const Title = styled.h3`
  font-size: 30px;
  font-weight: bold;

  margin-bottom: 20px;
  text-align: center; /* Center the title */
`;

// General paragraph style
export const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 15px;
  text-align: justify;
  margin: 20px auto;
  text-transform: capitalize;
`;

// Unordered list for bullet points
export const UnorderedList = styled.ul`
  margin: 15px 0;
  padding-left: 20px;
`;

// List item for unordered lists
export const ListItem = styled.li`
  font-size: 20px;
  margin-left: 160px;
  color: #000; /* Same text color as paragraph */
  line-height: 1;
  margin-bottom: 10px;
`;