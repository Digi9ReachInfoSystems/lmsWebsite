import styled from 'styled-components';
import { theme } from "../../../style/theme/theme";

// Container for the entire page
export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  // background: linear-gradient(to bottom, #f9f9f9, #eaeaea);
  // background-color: white;
  border-radius: 12px;
  // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);  
`;

// Header for the board name
export const Header = styled.h1`
  text-align: center;
  margin-bottom: 15px;
  color: #1d3557;
  font-size: 2.5em;
  font-weight: 700;
  letter-spacing: 1px;
`;

// Board description
export const BoardDescription = styled.p`
  text-align: center;
  color: #457b9d;
  margin-bottom: 40px;
  font-size: 1.2em;
  line-height: 1.5;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;
export const BoardDescription1 = styled.p`
  text-align: center;
  color: #457b9d;
  // margin-bottom: 40px;
  font-size: 1.2em;
  // line-height: 1.5;
  // max-width: 800px;
  margin-left: -220px;
  // margin-right: auto;



  
`;

// Loading message
export const LoadingMessage = styled.div`
  font-size: 1.3em;
  text-align: center;
  color: #457b9d;
`;

// Error message
export const ErrorMessage = styled.div`
  color: #e63946;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
`;

// No classes message
export const NoClassesMessage = styled.div`
  font-size: 1.3em;
  text-align: center;
  color: #6d6875;
  margin: 20px 0;
`;

// Grid for class cards
export const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px 0;
`;

// Individual class card
export const ClassCard = styled.div`
  // background: #fff;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #ccc;
  // box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
    background: linear-gradient(to bottom, #EE1B7A33, #FFFFFF33);


  &:hover {
    transform: translateY(-8px);
    // box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    background: linear-gradient(to bottom, #ffffff, #f1f3f4);
  }
`;

// Class title
export const ClassTitle = styled.h2`
  margin: 0 0 10px 0;
  color: #1d3557;
  font-size: 1.5em;
  font-weight: bold;
`;

// Class level
export const ClassLevel = styled.p`
  margin: 0 0 10px 0;
  color: #2a9d8f;
  font-weight: 600;
  font-size: 1.1em;
`;

// Board name within class card
export const BoardName = styled.p`
  margin: 0;
  color: #6c757d;
  font-style: italic;
  font-size: 0.95em;
  // text-align: right;
  line-height: 1.5;
  margin-bottom: 10px;
  margin-top: 10px;
`;



export const BannerImage = styled.img`
  width: 250;
  height: 150px;
  border-radius: 10px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.xl}) {
    height: 300px;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    height: 250px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 230px;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    height: 200px;
  }
`;