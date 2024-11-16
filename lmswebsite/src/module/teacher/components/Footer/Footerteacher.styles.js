import styled from "styled-components";
import { theme, media } from "../../../../style/theme/theme";

export const FooterContainer = styled.footer`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  padding: 40px 20px;
  font-family: ${theme.typography.fontFamily};
   h3{
   color: ${theme.colors.white};
   }

  ${media.md`
    padding: 30px 15px;
  `}
`;

export const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;

  ${media.md`
    gap: 15px;
  `}

  ${media.sm`
    flex-direction: column;
    align-items: center;
  `}
`;

export const FooterColumn = styled.div`
  flex: 1 1 200px;
  margin: 10px;

  h3, h4 {
    color: ${theme.colors.primary};
    margin-bottom: 10px;
    font-size: 1.2rem;

    ${media.sm`
      font-size: 1rem;
    `}
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      color: ${theme.colors.textSecondary};
      font-size: 0.9rem;
      margin-bottom: 5px;

      ${media.sm`
        font-size: 0.85rem;
      `}
    }
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid ${theme.colors.gray300};
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};

  ${media.md`
    flex-direction: column;
    align-items: center;
  `}
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
      color: ${theme.colors.primaryDark};
    }
  }
`;

export const FooterSocial = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  a {
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    transition: color 0.3s;

    &:hover {
      color: ${theme.colors.primaryDark};
    }

    i {
      font-size: 1.2rem;
    }
  }
`;
