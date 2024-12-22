import styled from "styled-components";
import {theme,media} from "../../../../style/theme/theme";

// Main Toolbar Card Container
export const ToolbarCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  // width: 50%;
  padding: 10px;
  background-color: ${theme.colors.nyanza};
  border: 1px solid #ddd;
  border-radius: 14px;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

 ${media.lg`
        // width: auto;
        padding: 10px;
        border-radius: 8px;
        `}
        ${media.xl`
        width: auto;
        padding: 10px;
        border-radius: 8px;
    
        `}
        ${media.xxl`
        width: auto;
        padding: 10px;
        border-radius: 8px;
        `}
        
      ${media.md`
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        // flex-direction: column;
        `}
      ${media.sm`
        // width: 100%;
        padding: 10px;
        border-radius: 8px;
        flex-direction: column;

        `}
        ${media.xs`
        // width: 100%;
        padding: 10px;
        border-radius: 8px;
        `}
      
`;

// Individual Box
export const Box = styled.div`
  flex: 1;
 display : flex;
 align-items: center;
 font-size: 14px;
  padding: 15px 15px;
  margin: 5px;
  text-align: center;
  font-weight: bold;
  color: #333;
  background-color: ${theme.colors.floralWhite};
  // border: 1px solid #ccc;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.colors.aliceBlue};
    color: ${theme.colors.black};
    border-color: ${theme.colors.black};
  }

  .quiz-icon {
    margin-right: 8px;
    font-size: 20px;
     ${media.xxl`
     margin-right: 8px;
    font-size: 18px;
    `}
    ${media.xl`
     margin-right: 8px;
    font-size: 16px;
    `}
    ${media.lg`
     margin-right: 8px;
    font-size: 14px;
    `}
    ${media.md`
     margin-right: 8px;
    font-size: 12px;
    `}
    ${media.sm`
     margin-right: 8px;
    font-size: 12px;
    `}
    ${media.xs`
     margin-right: 8px;
    font-size: 12px;
    `}
  }
 ${media.xxl`
    padding: 15px 10px;
    font-size: 12px;
    `}
        ${media.xl`
    padding: 15px 3px;
    font-size: 12px;
    `}
  ${media.lg`
    padding: 15px 3px;
    font-size: 10px;
    `}

   

  ${media.md`
    padding: 15px 30px;
    `}
    ${media.xs`
    padding: 15px 20px;
    `}
`;
