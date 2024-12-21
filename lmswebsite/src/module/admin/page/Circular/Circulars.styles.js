import styled from "styled-components";
import { theme, media } from "../../../../style/theme/theme";

export const CircularWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 20px;
  
  ${media.md
    `
    padding: 15px;
  `}

  ${media.sm
    `
    padding: 10px;
  `}

  ${media.xs
    `
    padding: 10px;
  `}
  }

  .circular-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${media.md`
      flex-direction: column;
      gap: 10px;
    `}

    ${media.sm`
      flex-direction: column;
      gap: 10px;
    `}

    ${media.xs`
      flex-direction: column;
      gap: 10px;
    `}
  }

  .circular-title {
    font-family: ${theme.typography.fontFamily};
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    y
    color: ${theme.colors.frenchGray};
    flex: 1;

    ${media.md`
      text-align: center;
    `}

    ${media.sm`
      text-align: center;
    `}

    ${media.xs`
      text-align: center;
    `}
  }

  .circular-image-box {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;

    ${media.md`
      width: 40px;
      height: 40px;
    `}

    ${media.sm`
      width: 40px;
      height: 40px;
    `}

    ${media.xs`
      width: 40px;
      height: 40px;
    `}

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Button = styled.button`
  background-color: ${theme.colors.pink4};
  color: ${theme.colors.white};
  padding: 0.7em 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: ${theme.typography.fontFamily};
  transition: background-color 0.3s;
  align-self: center; /* Center the button horizontally */

  &:hover {
    background-color: ${theme.colors.pink4};  


  }

  ${media.md`
    padding: 0.5em 1em;
  `}

  ${media.sm`
    padding: 0.5em 1em;
  `}

  ${media.xs`
    padding: 0.5em 1em;
  `}
`;