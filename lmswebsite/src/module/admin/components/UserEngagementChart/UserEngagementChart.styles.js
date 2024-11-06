import styled from "styled-components";
import { media } from "../../../../style/theme/theme";
export const UserEngagementChartWrap = styled.div`
  width: 80%;
  height: 40vh;
  .chart-wrapper {
    position: relative;
<<<<<<< HEAD:lmswebsite/src/module/admin/components/UserEngagementChart/UserEngagementChart.css
    width: 80%;
    max-width: 40vw;
    height : 50vh;
=======
    width: 100%;

    height: 44vh;
    margin: 0 auto;
>>>>>>> f511f8f9b797eb679a696d84b33ec9de5da0caba:lmswebsite/src/module/admin/components/UserEngagementChart/UserEngagementChart.styles.js
    background-color: #fff;
    border-radius: 0.8rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
  }

  .filter-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .filters-dropdown {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 10px;
    background-color: white !important; /* White background */
    padding: 10px;
    border-radius: 8px !important;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .filter-dropdown {
    background-color: white !important; /* White background */
    /* width: 150px; */
  }
  /* Hide the filter-dropdown for Webkit browsers (Chrome, Safari, Edge) */
  .filter-dropdown::-webkit-scrollbar {
    width: 0;
    /* Hide scrollbar width */
  }

  /* Hide filter-dropdown for Firefox */
  .filter-dropdown {
    scrollbar-width: none;
    /* Hide scrollbar for Firefox */
  }

  .clear-button {
    align-self: center;
  }

  .user-engagement-chart {
    margin-top: 20px;
    height: 80% !important;
  }
`;
