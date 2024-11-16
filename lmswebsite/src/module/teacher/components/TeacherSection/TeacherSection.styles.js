import styled from "styled-components";
import { theme, media } from "../../../../style/theme/theme";

export const TeachersSectionContainer = styled.section`
  padding: 40px 20px;
  background-color: ${theme.colors.backgroundLight};
  text-align: center;

  ${media.md`
    padding: 30px 15px;
  `}
`;

export const SectionTitle = styled.h2`
  font-family: ${theme.typography.fontFamily};
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 30px;

  ${media.lg`
    font-size: 1.8rem;
    margin-bottom: 25px;
  `}

  ${media.md`
    font-size: 1.6rem;
    margin-bottom: 20px;
  `}

  ${media.sm`
    font-size: 1.4rem;
    margin-bottom: 18px;
  `}

  ${media.xs`
    font-size: 1.2rem;
    margin-bottom: 15px;
  `}
`;

export const TeachersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;

  ${media.md`
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  `}

  ${media.sm`
    grid-template-columns: 1fr;
    gap: 10px;
  `}
`;

export const TeacherCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const TeacherImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;

  ${media.md`
    height: 220px;
  `}

  ${media.sm`
    height: 200px;
  `}

  ${media.xs`
    height: 150px;
  `}
`;

export const TeacherInfo = styled.div`
  padding: 20px;

  .teacher-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${theme.colors.black};
    margin-bottom: 5px;

    ${media.sm`
      font-size: 1.1rem;
    `}
  }

  .teacher-subject {
    font-size: 1rem;
    color: ${theme.colors.black};
    margin-bottom: 5px;

    ${media.sm`
      font-size: 0.95rem;
    `}
  }

  .teacher-experience {
    font-size: 0.9rem;
    color: ${theme.colors.textPrimary};

    ${media.sm`
      font-size: 0.85rem;
    `}
  }
`;
