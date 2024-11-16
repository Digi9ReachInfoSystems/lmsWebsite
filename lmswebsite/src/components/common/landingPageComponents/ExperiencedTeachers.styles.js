import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
`;

export const TeacherCard = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

export const TeacherRole = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 8px;
`;

export const TeacherInfo = styled.p`
  margin: 4px 0;
  color: #555;
`;

export const ResumeLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const NoTeachersMessage = styled.p`
  color: #888;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;
