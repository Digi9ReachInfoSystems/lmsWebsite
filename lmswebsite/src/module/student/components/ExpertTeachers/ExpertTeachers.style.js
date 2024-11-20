import styled from "styled-components";

// Container for the entire teacher section
export const TeacherContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f8e7d8;
`;

// Title for the teacher section
export const TeacherTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

// Subtitle for the teacher section
export const TeacherSubtitle = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  font-style: italic;
  color: #555;
  text-align: center;
`;

// Container for teacher cards
export const TeacherCardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

// Individual teacher card
export const TeacherCard = styled.div`
  flex: 0 0 250px; /* Fixed width for each card */
  text-align: center;
  padding: 15px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 300px;
    z-index: -1;
  }
`;

// Teacher details within the card
export const TeacherDetails = styled.div`
  margin-top: -10px;
  background-color: #d9b18e;
  height: 125px;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

// Experience text
export const Experience = styled.p`
  font-size: 16px;
  background-color: #fff;
  padding: 2px;
  width: 100px;
  border-radius: 10px;
  color: #000;
`;

// Teacher name
export const Name = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
`;

// Teacher subject
export const Subject = styled.p`
  font-size: 16px;
  color: #000;
`;

// Context container
export const TeacherContext = styled.div`
  display: flex;
  margin-left: 65px;
  flex-wrap: wrap;
  gap: 20px;
  width: 90%;
  justify-content: center;
  background-color: #fff;
  height: 200px;
  margin-top: -15px;
  border-radius: 20px;
`;

// Context section
export const TeacherSection = styled.div`
  display: flex;
  align-items: center;
  max-width: 300px;
  text-align: left;
`;

export const ContextImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

export const ContextText = styled.p`
  font-size: 16px;
  color: #555;
  width: 300px;
`;
