import styled from "styled-components";

import { media, theme } from "../../../../style/theme/theme";

export const SearchBarWrap = styled.div`


.searchBar-batchSearch {
    position: relative; /* Allows positioning of the search icon inside the input */
    margin: 2vh; /* Use vh for vertical spacing */
    padding: 0;
    display: flex;
    align-items: center; /* Center elements vertically */
    width: 100%; /* Full width for responsive behavior */
    ${media.xs`
        flex-direction: row; /* Keep elements in a row */ /* Ensure space between the input and icon */
          align-items: center; 
          justify-content:space-between;
       `}
  }
  
  .searchBar-searchIcon {
    position: absolute;
    left: 2vw; /* Position the icon inside the input using vw */
    top: 50%; /* Center vertically */
    transform: translateY(-50%); /* Adjust for perfect centering */
    font-size: 2vw; /* Adjust icon size using vw */
    color: ${theme.colors.frenchGray};

    ${media.md`
        display: none;
     `}
     ${media.xs`
        font-size: 5vw; /* Further reduce icon size for small screens */
          left: 1vw;
       `}
  }
  
  #searchBar-search {
    width: 25vw; /* Adjust width using vw */
    height: 6vh; /* Adjust height using vh */
    border-radius: 0.8vw; /* Use vw for consistent border-radius */
    border: .2vw solid  ${theme.colors.frenchGray};
    padding-left: 5vw; /* Add padding to make space for the icon */
    ${media.md`
        width: 30vw; /* Adjust width for medium screens */
       padding-left: 4vw; /* Adjust padding for icon */
     `}
     ${media.xs`
        width: 45vw; /* Adjust width for smaller screens */
        font-size: 4vw;
          padding-left: 3vw;
       `}
  }
  
  .searchBar-FunnelIcon {
    font-size: 3vw; /* Adjust funnel icon size using vw */
    margin-left: 2vw; /* Use vw for consistent margin */
    color:  ${theme.colors.frenchGray};
     ${media.md`
     font-size: 6vw; 
    `}
    
       ${media.xs`
        font-size: 8vw;
      `}
  }
  
  
  
`