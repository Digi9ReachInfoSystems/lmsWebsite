// src/module/teacher/pages/BecomeTeacherApplicationForm/TaskBoard/AssignedBatchStudentsList.styles.js

import styled from "styled-components";
import { theme, media } from "../../../../style/theme/theme";

// Main container for the AssignedBatchStudentsList component
export const TeacherStudentsListContainer = styled.div`
  font-family: ${theme.typography.fontFamily};
  padding: 20px;
  min-height: 60vh;
  background-color: ${theme.colors.seasalt};
 

  ${media.sm`
    padding: 15px;
  `}

  ${media.xs`
    padding: 10px;
  `}
  ${media.md `
    padding: 15px;
  `}

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Changed from space-between to flex-start */
    margin-bottom: 20px;

    ${media.md`
      margin-bottom: 15px;
    `}

    ${media.sm`
      margin-bottom: 10px;
    `}

    ${media.xs`
      margin-bottom: 5px;
    `}

    /* Styling the back link */
    a {
      display: flex;
      align-items: center;
      color: ${theme.colors.black};
      font-size: 1.5rem;
      transition: color 0.3s ease;
      cursor: pointer; /* Ensures the cursor changes to pointer on hover */

    ${media.md`
      font-size: 1.3rem;
      `}

      ${media.sm`
        font-size: 1.1rem;
        `}

        ${  media.xs`
        font-size: 1rem;
        `}

      svg {
        margin-right: 8px; /* Add spacing between icon and h2 */
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.2);
        }
      }
    }

    h2 {
      font-size: 1.8rem;
      color: ${theme.colors.cadet};
      margin: 0;
      /* Removed flex:1; */

      ${media.md`
        font-size: 1.5rem;
      `}

   

      ${media.xs`
        font-size: 1.1rem;
          `}
    }

    ${media.sm`
      flex-direction: column;
      align-items: flex-start;

      h2 {
        margin-top: 10px;
        ${media.xs`
          margin-top: 5px;
          `}

          ${media.md`
          margin-top: 10px;
          `}

          ${media.sm`
          margin-top: 5px;
          `}
      }
    `}
  }

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }

  .students-table {
    background-color: ${theme.colors.white};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 12px 15px;
        text-align: left;
      }

      th {
        background-color: ${theme.colors.pink4};
        color: ${theme.colors.cadet};
        font-weight: bold;
        font-size: 1rem;
        border-bottom: 2px solid ${theme.colors.gray700};
      }



      td {
        font-size: 0.95rem;
        color: ${theme.colors.gray700};
      }

      ${media.sm`
        th,
        td {
          padding: 10px 12px;
          font-size: 0.9rem;
        }
      `}

      ${media.xs`
        th,
        td {
          padding: 8px 10px;
          font-size: 0.85rem;
        }
      `}
    }
  }

  .ant-alert {
    margin-top: 20px;
  }

  .ant-spin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }

  /* Responsive adjustments for the table */
  @media (max-width: 768px) {
    .students-table {
      overflow-x: auto;

      table {
        min-width: 600px;
      }
    }
  }

  @media (max-width: 480px) {
    .header h2 {
      font-size: 1.2rem;
    }

    .students-table table {
      min-width: 500px;
    }
  }
`;

// Header styles
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
${media.sm`
    margin-bottom: 15px;
  `}

  ${media.md`
    margin-bottom: 10px;
  `}

  ${media.xs`
    margin-bottom: 5px;
      `}
  h1 {
    font-size: 24px;
    margin: 0;

    ${media.md`
      font-size: 18px;
      `
    }
      ${media.sm`
      font-size: 16px;
      `}

      ${media.xs`
      font-size: 16px;
        `}
  }

  button {
    padding: 10px 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;

    ${media.md`
      padding: 8px 16px;
      `}

      ${media.sm`
      padding: 6px 12px;
      `}

      ${media.xs`
      padding: 4px 8px;
        `}
  }

  button:hover {
    background: #ee1b7a;
  }
`;


// Container styles
export const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  min-height: 100vh;

  ${media.md`
    padding: 15px;
  `}

  ${media.sm`
    padding: 10px;
  `}

  ${media.xs`
    padding: 5px;
  `}

  h2 {
    font-size: 20px;
    margin: 0;
    text-align: left; /* Align the title text to the right */

    ${media.md`
      font-size: 18px;
    `}

    ${media.sm`
      font-size: 16px;
    `}

    ${media.xs`
      font-size: 14px;
    `}

  }

  .MeetingTitle {
    height: 16px;
    width: 16px;
    background-color: #9f9595;
    margin-right: 20px;

    ${media.md`
      margin-right: 15px;
    `}

    ${media.sm`
      margin-right: 10px;
    `}

    ${media.xs`
      margin-right: 5px;
    `}
  }

  .Meet {
    display: flex;
  }

  .MeetingDay {
    font-size: 12px;
    margin: 10px 0 10px 35px;
    padding: 0;
  }

  @media (max-width: 768px) {
    padding: 15px; /* Reduce padding for smaller screens */
  }

  @media (max-width: 480px) {
    padding: 10px;
    h2 {
      font-size: 16px; /* Smaller font size for very small screens */
    }
  }
`;

// Meeting details container styles
export const MeetingDetails = styled.div`
  margin-top: 20px;
  background: #fff;
  border-radius: 10px;
  border: 2px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;

  ${media.md`
    padding: 15px;
  `}

  ${media.sm`
    padding: 10px;
  `}
  ${media.xs`
    padding: 5px;
  `}
`;

// Meeting header styles
// Meeting header with icons and title on separate lines
export const MeetingHeader = styled.div`
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: flex-end; /* Align content to the right */

  ${media.md`
    flex-direction: row; /* Stack children horizontally */
    align-items: center; /* Align content to the center */
  `}

  ${media.sm`
    flex-direction: column; /* Stack children vertically */
    align-items: flex-end; /* Align content to the right */ 
  `}

  ${media.xs`
    flex-direction: column; /* Stack children vertically */
    align-items: flex-end; /* Align content to the right */
  `}

  .icon-container {
    display: flex;
    gap: 15px; /* Spacing between icons */
    margin-bottom: 10px; /* Adds space below icons */
  }

  svg {
    font-size: 18px;
    cursor: pointer;
  }

  svg:hover {
    color: #ff4081;
  }
`;

// Member info container styles
export const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-weight: ${(props) => (props.bold ? "bold" : "normal")};
    font-size: 12px;
    color: #888;
  }

  span:first-child {
    font-weight: bold;
  }
`;

// Join button styles
export const JoinButton = styled.button`
  padding: 10px 20px;
  background: #ff4081;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${media.md`
    padding: 8px 16px;
  `}
  ${media.sm`
    padding: 6px 12px;
    `}
    ${media.xs`
    padding: 4px 8px;
    `}

  &:hover {
    background: #e91e63;
  }
`;

// Member list styles
export const MemberList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adds space between the icon and the text */

  .Member {
    display: flex;
  }

  .MeetingMember {
    display: flex;
    flex-direction: column;
  }

  .MembericonMember {
    display: flex;
  }

  span {
    margin-bottom: 10px;
  }
`;

export const AssignedBatchStudentsListContainer = styled.div`

.assigned-students-actions{
 display: flex;
 justify-content: space-between;
 gap: 20px;
}
 .assigned-students-header-row-heading{
 display: flex;
 align-items: center;
 gap: 20px;
 }

.assigned-students-header-row{
 display: flex;
 align-items: center;
 margin-bottom: 20px;
 justify-content: space-between;

}

${media.md`
.assigned-students-header-row{
 display: flex;
 align-items: center;
 margin-bottom: 15px;
 justify-content: space-between;

}
`}
${media.sm`
.assigned-students-header-row
{
 display: flex;
 align-items: center;
 margin-bottom: 10px;
 justify-content: space-between;
}
`}

`

