import styled from "styled-components";
import { media, theme } from "../../../../../style/theme/theme"; // Import the theme from theme.js

// Container for the Create Class page
export const Container = styled.div`
  padding: 24px;
  background-color: ${theme.colors.bgLight};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 1200px;

  ${media.md`
    padding: 16px;
  `}

  ${media.sm`
    padding: 16px;
  `}

  ${media.xs`
    padding: 8px;
  `}
`;

// Title for the page
export const Title = styled.h1`
  font-size: 28px;
  color: ${theme.colors.gray800};
  margin-bottom: 16px;

  ${media.md`
    font-size: 24px;
  `}

  ${media.sm`
    font-size: 24px;
  `}

  ${media.xs`
    font-size: 20px;
  `}
`;

// Wrapper for the button
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;

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
`;

// Styled button for creating a new class
export const StyledButton = styled.button`
  background-color: ${theme.colors.pink};
  color: ${theme.colors.white};
  border-radius: 4px;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;

  ${media.md`
    font-size: 14px;
  `}

  ${media.sm`
    font-size: 14px;
  `}

  ${media.xs`
    font-size: 12px;
  `}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.pink};
  }

  svg {
    margin-right: 8px;
  }
`;

// Modal styles can be customized as needed
export const ModalContainer = styled.div`
  background-color: ${theme.colors.white};

  ${media.md`
    padding: 16px;
  `}

  ${media.sm`
    padding: 16px;
  `}

  ${media.xs`
    padding: 8px;
  `}
`;

// Table styles
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid ${theme.colors.gray300};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${theme.colors.white};
  margin-bottom: 24px;

  ${media.md`
    width: 100%;
    padding: 15px;
  `}

  ${media.sm`
    width: 100%;
    padding: 10px;
  `}

  ${media.xs`
    width: 100%;
    padding: 5px;
  `}
`;

// Styled Table with custom header
export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: ${theme.colors.pink}; /* Table header background */
    color: ${theme.colors.white}; /* Text color in the header */

    ${media.md`
      font-size: 12px;
    `}

    ${media.sm`
      font-size: 12px;
    `}

    ${media.xs`
      font-size: 10px;
    `}
  }
`;
