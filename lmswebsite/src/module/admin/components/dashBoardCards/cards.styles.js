import styled from "styled-components";
import { BlockWrapStyles } from "../../../../style/DefaultStyles/DefaultStyles";
import { media } from "../../../../style/theme/theme";

export const CardBlockWrap = styled.div`
//   color: ${(props) => props.theme.colors.cadet};
  ${BlockWrapStyles}
  margin-bottom: 24px;

  .block-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .block-title {
      font-size: 1.5rem;
      color: ${(props) => props.theme.colors.black};
      font-weight: bold;
    }
  }

  .dashboard-card {
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s;
    cursor: pointer;
    height: 140px; /* Set a fixed height to match the design */

    &:hover {
      transform: translateY(-5px);
    }
  }

  .card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    height: 100%; /* Ensure the content fills the card height */
  }

  .card-icon {
    width: 100px;
    height: 86px;
    border-radius: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
    }
  }

  .card-info {
    text-align: Left; /* Align the text to the right to match the design */

    .card-title {
      font-size: 1rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.gray700};
      margin-bottom: 4px;
    }

    .card-count {
      font-size: 2rem; /* Increase the font size for better emphasis */
      font-weight: bold;
      color: ${(props) => props.theme.colors.black};
    }
  }
`;
