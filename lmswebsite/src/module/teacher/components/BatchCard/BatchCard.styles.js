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
    height: 400px;
    transition: all 0.3s ease;
    margin: 10px;
    position: relative; /* Added for positioning footer */
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    }

    ${media.md`
      max-width: 300px;
      height: 420px;
      margin: 15px;
    `}

    ${media.sm`
      max-width: 250px;
      height: 390px;
      margin: 10px;
    `}

    ${media.xs`
      /* max-width: 200px; */
      height: 350px;
      margin: 5px;
    `}
  }

  .batch-image-container {
    width: 100%;
    height: 150px;
    overflow: hidden;
    border-bottom: 2px solid #f1f1f1;

    ${media.md`
      height: 180px;
    `}

    ${media.sm`
      height: 150px;
    `}

    ${media.xs`
      height: 120px;
    `}
  }

  .batch-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;

    ${media.md`
      height: 180px;
    `}

    ${media.sm`
      height: 150px;
    `}

    ${media.xs`
      height: 120px;
    `}
  }

  .batch-content {
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
  }

  /* Header Styles */
  .batch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    ${media.md`
      margin-bottom: 8px;
    `}

    ${media.sm`
      margin-bottom: 5px;
    `}

    ${media.xs`
      margin-bottom: 3px;
    `}

  }

  .batch-name {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    color: #333;

    ${media.md`
      font-size: 16px;
    `}

    ${media.sm`
      font-size: 14px;
    `}

    ${media.xs`
      font-size: 12px;
    `}

  }

  .batch-date {
    font-size: 14px;
    color: #888;

    ${media.md`
      font-size: 12px;
    `}

    ${media.sm`
      font-size: 10px;
    `}

    ${media.xs`
      font-size: 8px;
    `}

  }

  /* Batch Details */
  .batch-details {
    margin-top: 10px;
    font-size: 14px;
    color: #555;
    display: flex;
    flex-direction: column;
    gap: 5px;

    ${media.md`
      font-size: 12px;
    `}

    ${media.sm`
      font-size: 10px;
    `}

    ${media.xs`
      font-size: 8px;
    `}

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

    ${media.md`
      bottom: 15px;
      right: 15px;
    `}

    ${media.sm`
      bottom: 10px;
      right: 10px;
    `}

    ${media.xs`
      bottom: 5px;
      right: 5px;
    `}
  }

  .action-text {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: auto;
    padding: 10px 20px;

    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.3s ease;


    ${media.md`
      padding: 8px 16px;
      font-size: 12px;
    `}

    ${media.sm`
      padding: 6px 12px;
      font-size: 10px;
    `}

    ${media.xs`
      padding: 4px 8px;
      font-size: 8px;
    `}
  }
`;
