// // src/components/BatchCard.styles.js

// // import styled from "styled-components";
// // import { media } from "../../../../style/theme/theme";

// // export const BatchCardWrap = styled.div`
// //   .batch-card {
// //     display: flex;
// //     flex-direction: row;
// //     border: 1px solid ${(props) => props.theme.colors.frenchGray};
// //     border-radius: 8px;
// //     overflow: hidden;
// //     background-color: ${(props) => props.theme.colors.white};
// //     transition: box-shadow 0.3s ease;
// //     width: 100%; /* Take full width of the parent */
// //     height: 300px; /* Increased height */
// //     max-width: 100%;
// //      ${media.md`
// //     flex-direction: column;
// //       height: auto;
// //              `
// //     }
// //   }

// //   .batch-card:hover {
// //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
// //   }

// //   .batch-image-container {
// //     flex: 1 1 40%;
// //     max-width: 40%;
// //     margin: 2vh;
// //     border-radius: 20px;
// //     height: 90%;
// //     overflow: hidden;
// //      ${media.md`
// //      max-width: 100%;
// //       flex: 1 1 100%;
// //        height: 200px;
// //              `
// //     }
// //   }

// //   .batch-image {
// //     width: 100%;
// //     height: 100%;
// //     object-fit: cover;
// //   }

// //   .batch-content {
// //     flex: 1 1 60%;
// //     padding: 20px;
// //     display: flex;
// //     flex-direction: column;
// //     justify-content: space-between;
// //      ${media.md`
// //      max-width: 100%;
// //       flex: 1 1 100%;
// //        padding: 16px;
// //              `
// //     }
// //   }

// //   .batch-name {
// //     font-size: 20px;
// //     margin: 0 0 16px 0;
// //     color: ${(props) => props.theme.colors.black};
// //      ${media.md`
// //     font-size: 1.5rem;
// //       margin-bottom: 12px;
// //              `
// //     }
// //   }

// //   .batch-details {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 12px;
// //     flex-grow: 1;
// //   }

// //   .detail-item {
// //     display: flex;
// //     align-items: center;
// //   }

// //     .detail-item-date {
// //     margin-right: 10px;
// //     float: right;
// //   }

// //   .detail-icon {
// //     margin-right: 10px;
// //     font-size: 12px;

// //      ${media.md`
// //    font-size: 1.2rem;
// //       margin-right: 8px;
// //              `
// //     }
// //   }

// //   .detail-text {
// //     font-size: 1.1rem;
// //     color: ${(props) => props.theme.colors.black};
// //     ${media.md`
// //         font-size: 1rem;
// //                  `
// //         }
// //   }

// //   .no-teacher {
// //     color:${(props) => props.theme.colors.red}; /* Red color for "No Teacher Assigned" */
// //   }

// // `;

// // src/components/BatchCard.styles.js

// import styled from "styled-components";
// import { media } from "../../../../style/theme/theme";

// export const BatchCardWrap = styled.div`
//   .batch-card {
//     background-color: #fff;
//     border-radius: 12px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//     overflow: hidden;
//     width: 100%;
//     max-width: 300px;
//     height: 500px;
//     transition: all 0.3s ease;
//     margin: 10px;
//     &:hover {
//       transform: translateY() (-5px);
//       box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
//     }
//   }

//   .batch-image-container {
//     width: 100%;
//     height: 200px;
//     overflow: hidden;
//     border-bottom: 2px solid #f1f1f1;
//   }

//   .batch-image {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     border-radius: 12px 12px 0 0;
//   }

//   .batch-content {
//     padding: 20px;
//   }

//   /* Header Styles */
//   .batch-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 10px;
//   }

//   .batch-name {
//     font-size: 18px;
//     font-weight: bold;
//     margin: 0;
//     color: #333;
//   }

//   .batch-date {
//     font-size: 14px;
//     color: #888;
//   }

//   /* Batch Details */
//   .batch-details {
//     margin-top: 10px;
//     font-size: 14px;
//     color: #555;
//     display: flex;
//     flex-direction: column;
//     gap: 5px;
//   }

//   .detail-item {
//     display: flex;
//     align-items: center;
//   }

//   .detail-icon {
//     margin-right: 10px;
//     font-size: 12px;

//     ${media.md`
//       font-size: 1.2rem;
//       margin-right: 8px;
//     `}
//   }

//   .detail-text {
//     font-size: 1.1rem;
//     color: ${(props) => props.theme.colors.black};

//     ${media.md`
//       font-size: 1rem;
//     `}
//   }

//   .no-teacher {
//     color: ${(props) =>
//       props.theme.colors.red}; /* Red color for "No Teacher Assigned" */
//   }

//   /* Footer Styles */
//   .batch-footer {
//     margin-top: 20px;
//     display: flex;
//     justify-content: flex-end;
//   }

//   .action-text {
//     color: #fff;
//     padding: 10px 20px;
//     border: none;
//     border-radius: 25px;
//     cursor: pointer;
//     font-size: 14px;
//     font-weight: 600;
//     transition: background-color 0.3s ease;
//   }
// `;

import styled from "styled-components";
import { media } from "../../../../style/theme/theme";

export const BatchCardWrap = styled.div`
  .batch-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 250px;
    height: 370px;
    transition: all 0.3s ease;
    margin: 10px;
    position: relative; /* Added for positioning footer */
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    }
  }

  .batch-image-container {
    width: 100%;
    height: 150px;
    overflow: hidden;
    border-bottom: 2px solid #f1f1f1;
  }

  .batch-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  .batch-content {
    padding: 20px;
  }

  /* Header Styles */
  .batch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .batch-name {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    color: #333;
  }

  .batch-date {
    font-size: 14px;
    color: #888;
  }

  /* Batch Details */
  .batch-details {
    margin-top: 10px;
    font-size: 14px;
    color: #555;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .detail-item {
    display: flex;
    align-items: center;
  }

  .detail-icon {
    margin-right: 10px;
    font-size: 12px;

    ${media.md`
      font-size: 1.2rem;
      margin-right: 8px;
    `}
  }

  .detail-text {
    font-size: 14px;
    color: ${(props) => props.theme.colors.black};

    ${media.md`
      font-size: 1rem;
    `}
  }

  .no-teacher {
    color: ${(props) =>
      props.theme.colors.red}; /* Red color for "No Teacher Assigned" */
  }

  /* Footer Styles */
  .batch-footer {
    position: absolute; /* Position footer at the bottom */
    bottom: 20px; /* Distance from the bottom of the card */
    right: 20px; /* Distance from the right of the card */
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .action-text {
    color: #fff;
    padding: 10px 20px;

    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }
`;
