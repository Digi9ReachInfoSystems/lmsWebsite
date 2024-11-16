import styled from "styled-components";

import { media, theme } from "../../../../style/theme/theme";

export const DashboarTablewrap = styled.div`
  .DashboardTable-table-container {
    max-height: 400px;
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.white};

    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);

    ${media.md`
    width:80%;
    margin-left:10%;
    margin-right:10%;
     overflow-x: auto; /* Enable horizontal scrolling on smaller screens */
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
   `}
  }

  .DashboardTable-table-container table {
    width: 100%;
    min-width: 600px;
    //  border-radius:10px !important;
  }

  .DashboardTable-table-container table {
    //   width: 100%;
    min-width: 600px;
    box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  }

  .DashboardTable-thead {
    background-color: #ffcaea;
    // background-color: ${(props) => props.theme.colors.pink3};
    // justify-content: space-between;
    border-radius: 10px;
    position: sticky;

    text-align: left;
    top: 0;
  }

  .DashboardTable-table-container th {
    font-size: 14px;

    font-weight: 550;
    color: ${(props) => props.theme.colors.cadet};
    padding-left: 15px;
    text-align: left;
    border-bottom: 1px solid ${(props) => props.theme.colors.frenchGray};
    border-top: 1px solid ${(props) => props.theme.colors.frenchGray};
    white-space: nowrap; /* Prevents column content from wrapping */
  }

  .DashboardTable-tdata {
    font-size: 12px;
    font-weight: 300;
    padding: 8px 8px 8px 16px;
    text-align: left;
    border-bottom: 1px solid ${(props) => props.theme.colors.frenchGray};
    // border-top: 1px solid ${(props) => props.theme.colors.frenchGray};
    white-space: nowrap; /* Prevents column content from wrapping */
    overflow: hidden;
    text-overflow: ellipsis; /* Adds ellipsis for overflowing text */
    ${media.md`
    text-align: center;
    `}
    ${media.xs`
        text-align: center;
        `}
  }

  .DashboardTable-tdata a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.pink6};
  }

  .DashboardTable-tdata .DashboarTable-tbtn {
    display: flex;
    padding: 0.4em 0.6em 0 0.6em;
    //   background: #bbffc6;
    background: ${(props) => props.theme.colors.aquamarine};
    border: none;
    outline: none;
    border-radius: 20px;
  }

  .DashboardTable-li {
    width: 10px;
    height: 10px;
    margin: 0.4em 0.6em 0.6em 0.6em;
    //   background: #1fff44;
    background: ${(props) => props.theme.colors.malachite};
    border-radius: 10px;
  }

  /* Pagination Controls */
  .DashboardTable-pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .DashboardTable-pagination-button {
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
    //   background-color: #f562ba;
    background-color: ${(props) => props.theme.colors.pink6};
    color: white;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;

    ${media.xs`
     padding: 4px 8px;
    `}
  }

  .DashboardTable-pagination-button:hover {
    //   background-color: #f323a0;
    background-color: ${(props) => props.theme.colors.pink4};
  }

  .DashboardTable-pagination-button:disabled {
    //   background-color: #cccccc;
    background-color: ${(props) => props.theme.colors.aliceBlue};
    cursor: not-allowed;
  }

  .DashboardTable-pagination-info {
    margin: 0 10px;
    font-size: 1rem;
    ${media.xs`
    font-size: 0.9rem;
    `}
  }
`;
