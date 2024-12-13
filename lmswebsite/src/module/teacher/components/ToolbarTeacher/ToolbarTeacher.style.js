import styled from "styled-components";
import {theme,media} from "../../../../style/theme/theme";

// Main Toolbar Card Container
export const ToolbarCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 50%;
  padding: 10px;
  background-color: ${theme.colors.nyanza};
  border: 1px solid #ddd;
  border-radius: 14px;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

 ${media.lg`
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        `}
        ${media.xl`
        width: 100%;
        padding: 10px;
        border-radius: 8px;
    
        `}
        ${media.xxl`
        width: 100%;
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
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        `}
        ${media.xs`
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        `}
      
`;

// Individual Box
export const Box = styled.div`
  flex: 1;
 display : flex;
 align-items: center;
 
  padding: 15px 30px;
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

  ${media.md`
    padding: 15px 50px;
    `}
    ${media.sm`
    padding: 15px 30px;
    `}
    ${media.xs`
    padding: 15px 20px;
    `}
`;
