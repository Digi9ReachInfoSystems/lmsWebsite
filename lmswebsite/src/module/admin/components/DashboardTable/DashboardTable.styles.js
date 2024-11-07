import styled from "styled-components";

import { media,theme } from "../../../../style/theme/theme";

export const DashboarTablewrap = styled.div`
.DashboarTable-table-container {
  max-height: 400px;
  padding:1rem;
  width: 100%;
  border-radius:10px;
  box-shadow: 0px 5px 18px 0px ${(props) => props.theme.colors.lightslategray};
  

  ${
    media.md`
    width:80%;
    margin-left:10%;
    margin-right:10%;
     overflow-x: auto; /* Enable horizontal scrolling on smaller screens */
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
   `}
}

.DashboarTable-table-container table {
//   width: 100%;
 min-width: 600px;
 border-radius:10px !important;
}

.DashboarTable-thead {
//   background-color: #ffcaea;
  background-color:${(props)=> props.theme.colors.pink300};
  justify-content: center;
  
  position: sticky;
  top: 0;
}

.DashboarTable-tbody {
  background-color: ${(props)=>props.theme.colors.white};
  justify-content: center;
}

.DashboarTable-table-containe th {
  font-size: 1.2rem;
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid ${(props)=>props.theme.colors.frenchGray};
  border-top: 1px solid ${(props)=>props.theme.colors.frenchGray};
  white-space: nowrap; /* Prevents column content from wrapping */
}

.DashboarTable-tdata {
  font-size: 1.2rem;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid ${(props)=>props.theme.colors.frenchGray};
  border-top: 1px solid${(props)=>props.theme.colors.frenchGray};
  white-space: nowrap; /* Prevents column content from wrapping */
  overflow: hidden;
  text-overflow: ellipsis; /* Adds ellipsis for overflowing text */
  ${
    media.md`
    text-align: center;
    `}
    ${
        media.xs`
        text-align: center;
        `}
}

.DashboarTable-tdata a {
  text-decoration: none;
  color:${(props)=>props.theme.colors.pink6} ;
}

.DashboarTable-tdata .DashboarTable-tbtn {
  display: flex;
  padding: 0.4em 0.6em 0 0.6em;
//   background: #bbffc6;
background:${(props)=>props.theme.colors.aquamarine};
  border: none;
  outline: none;
  border-radius: 20px;
}

.DashboarTable-li {
  width: 10px;
  height: 10px;
  margin: 0.4em 0.6em 0.6em 0.6em;
//   background: #1fff44;
    background:${(props)=>props.theme.colors.malachite};
  border-radius: 10px;
}

/* Pagination Controls */
.DashboarTable-pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
}

.DashboarTable-pagination-button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
//   background-color: #f562ba;
  background-color: ${(props)=>props.theme.colors.pink6};
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  ${
    media.xs`
     padding: 4px 8px;
    `}
}

.DashboarTable-pagination-button:hover {
//   background-color: #f323a0;
   background-color:${(props)=>props.theme.colors.pink4};
}

.DashboarTable-pagination-button:disabled {
//   background-color: #cccccc;
background-color:${(props)=>props.theme.colors.aliceBlue};
  cursor: not-allowed;
}

.DashboarTable-pagination-info {
  margin: 0 10px;
  font-size: 1rem;
  ${
    media.xs`
    font-size: 0.9rem;
    `}
}
 
`