import styled from 'styled-components';

export const TeachersSectionContainer = styled.section`
  padding: 60px 20px;
  text-align: center;
  width: 80%;
  margin-left: 10%;
  background-color: white;
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
`;

export const SectionSubtitle = styled.p`
  margin-top: -40px;
  margin-bottom: 40px;
  font-style: italic;
  color: #777;
`;

export const TeachersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const TeacherCard = styled.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const TeacherImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: rgb(255, 255, 255);
`;

export const TeacherInfo = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  text-align: left;
`;

export const TeacherName = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

export const TeacherSubject = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const TeacherExperience = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
`;

export const TeacherAvailability = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
`;

export const TeacherLanguage = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
`;


// Media queries
export const responsiveStyles = {
  '@media (max-width: 1024px)': {
    TeachersSectionContainer: {
      width: '85%',
    },
    SectionTitle: {
      fontSize: '32px',
    },
    TeachersGrid: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    },
    TeacherName: {
      fontSize: '20px',
    },
    TeacherSubject: {
      fontSize: '14px',
    },
    TeacherExperience: {
      fontSize: '14px',
    },
    TeacherAvailability: {
      fontSize: '14px',
    },
    TeacherLanguage: {
      fontSize: '14px',
    },
  },
  '@media (max-width: 768px)': {
    TeachersSectionContainer: {
      width: '90%',
    },
    SectionTitle: {
      fontSize: '28px',
    },
    TeachersGrid: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '15px',
    },
    TeacherName: {
      fontSize: '18px',
    },
    TeacherSubject: {
      fontSize: '14px',
    },
    TeacherExperience: {
      fontSize: '14px',
    },
    TeacherAvailability: {
      fontSize: '14px',
    },
    TeacherLanguage: {
      fontSize: '14px',
    },
    TeacherImage: {
      height: '180px',
    },
  },
  '@media (max-width: 480px)': {
    TeachersSectionContainer: {
      width: '95%',
    },
    SectionTitle: {
      fontSize: '24px',
    },
    TeachersGrid: {
      gridTemplateColumns: '1fr',
      gap: '10px',
    },
    TeacherName: {
      fontSize: '16px',
    },
    TeacherSubject: {
      fontSize: '12px',
    },
    TeacherExperience: {
      fontSize: '12px',
    },
    TeacherAvailability: {
      fontSize: '12px',
    },
    TeacherLanguage: {
      fontSize: '12px',
    },
    TeacherImage: {
      height: '150px',
    },
  },
};
