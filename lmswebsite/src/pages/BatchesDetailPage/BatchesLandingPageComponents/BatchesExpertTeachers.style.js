import styled from "styled-components";
import { theme } from "../../../style/theme/theme";

// Container for the teacher section
export const TeacherContainer = styled.div`
  font-family: ${theme.typography.fontFamily};
  width: 80%;
  margin: 60px auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
//   background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
// background-color: white;
  border-radius: 15px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

// Wrapper for the image and text content
export const TeacherContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Image for the teacher section
export const TeacherImage = styled.img`
  width: 50%;
  height: auto;
  border-radius: 15px;
  object-fit: cover;

  @media (max-width: ${theme.breakpoints.xl}){
    width: 50%;
  }
    @media (max-width: ${theme.breakpoints.lg}){
    width: 50%;
  }
    @media (max-width: ${theme.breakpoints.md})  {
    width: 80%;
  }
    @media (max-width: ${theme.breakpoints.sm}) {
    width: 60%;
  }
       @media (max-width: ${theme.breakpoints.xs}) {
    width: 60%;
  }

`;

// Text content container
export const TeacherTextContent = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

// Title for the teacher section
export const TeacherTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #00c897;
  margin-bottom: 20px;
`;

// Subtitle for the teacher section
export const TeacherSubtitle = styled.p`
  font-size: 18px;
//   font-style: italic;
display: flex;
  color: #34495e;
  margin-bottom: 40px;
  line-height: 1.5;
`;


export const Image = styled.p`
width: 35px;
height: 35px;
background-color: white;
display: flex;
justify-content: center;
align-items: center;
margin-right: 20px;
margin-top: 5px;
box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
border-radius: 50%;
`;



// Container for teacher cards
export const TeacherCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

// Individual teacher card
export const TeacherCard = styled.div`
  background-color: #ffffff;
  width: 300px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

// Teacher details within the card
export const TeacherDetails = styled.div`
  padding: 20px;
  text-align: center;
`;

// Teacher name
export const Name = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
`;

// Teacher subject
export const Subject = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  margin-bottom: 15px;
`;

// Experience text
export const Experience = styled.p`
  font-size: 14px;
  color: #16a085;
  font-weight: 500;
  background: rgba(22, 160, 133, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-block;
  margin-top: 10px;
`;
