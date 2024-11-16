import styled from "styled-components";
import { theme, media } from "../../../../style/theme/theme";

export const LMSTitle = styled.h3`
  font-family: ${theme.typography.fontFamily};
  font-size: 2rem;
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 20px;

  ${media.md`
    font-size: 1.8rem;
  `}

  ${media.sm`
    font-size: 1.6rem;
  `}
`;

export const TeachAtLMSContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 20px;
  background-color: ${theme.colors.backgroundLight};

  ${media.md`
    gap: 20px;
    flex-direction: column;
    align-items: center;
  `}
`;

export const LMSIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  text-align: center;

  ${media.md`
    max-width: 80%;
  `}
`;

export const LMSImagesWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;

  ${media.sm`
    width: 80px;
    height: 80px;
  `}
`;

export const LMSImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const LMSImageTitle = styled.p`
  font-size: 1rem;
  color: ${theme.colors.textPrimary};
  margin-top: 10px;

  ${media.sm`
    font-size: 0.95rem;
  `}
`;
