import styled from "styled-components";

export const TeacherAttendanceWrap = styled.div`
  .TeacherAttendance-heading-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  /* Add horizontal scrolling below 768px */
  @media (max-width: 768px) {
    .ant-table-wrapper {
      overflow-x: scroll; /* Enable horizontal scrolling */
      width: 700px;
    }
  }
`;
