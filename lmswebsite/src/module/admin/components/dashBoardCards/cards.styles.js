import styled from "styled-components";
import { BlockWrapStyles } from "../../../../style/DefaultStyles/DefaultStyles";
import { media } from "../../../../style/theme/theme";

export const CardBlockWrap = styled.div`
  ${BlockWrapStyles}

  .block-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    // height: 50px;

    .block-title {
      font-size: 1.5rem;
      color: ${(props) => props.theme.colors.black};
      font-weight: bold;

      ${media.lg`
        font-size: 1.25rem;
      `}

      ${media.md`
        font-size: 1rem;
      `}

      ${media.sm`
        font-size: 0.9rem;
      `}
    }
  }

  .dashboard-card {
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s;
    cursor: pointer;
    width: 100%; /* Makes the card adapt to container width */
    padding: 1rem; /* Adds padding inside the card */
    // height: 6vw;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    ${media.lg`
      padding: 0.75rem;
    `}

    ${media.md`
      padding: 0.5rem;
    `}

    ${media.sm`
      padding: 0.25rem;
      flex-direction: column; /* Stack content vertically on smaller screens */
    `}
  }

  .card-icon {
    border-radius: 100%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    img {
      width: 22px; /* Base width */

      ${media.lg`
        width: 50px;
      `}

      ${media.md`
        width: 40px;
      `}

      ${media.sm`
        width: 30px;
      `}
    }

    ${media.lg`
      width: 80px;
      height: 60px;
    `}

    ${media.md`
      width: 70px;
      height: 50px;
    `}

    ${media.sm`
      width: 60px;
      height: 40px;
    `}
  }

  .card-info {
    text-align: left;
    padding: 1rem;

    ${media.lg`
      padding: 0.75rem;
    `}

    ${media.md`
      padding: 0.5rem;
    `}

    ${media.sm`
      padding: 0.25rem;
    `}

    .card-title {
      font-size: 1rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.gray700};

      ${media.lg`
        font-size: 0.9rem;
      `}

      ${media.md`
        font-size: 0.75rem;
      `}

      ${media.sm`
        font-size: 0.65rem;
      `}
    }

    .card-subtitle {
      font-size: 0.9rem;
      font-weight: 400;
      color: ${(props) => props.theme.colors.gray600};

      ${media.lg`
        font-size: 0.8rem;
      `}

      ${media.md`
        font-size: 0.7rem;
      `}

      ${media.sm`
        font-size: 0.6rem;
      `}
    }

    .card-count {
      font-size: 1.2rem;
      font-weight: bold;
      color: ${(props) => props.theme.colors.black};

      ${media.lg`
        font-size: 1.1rem;
      `}

      ${media.md`
        font-size: 1rem;
      `}

      ${media.sm`
        font-size: 0.9rem;
      `}
    }
  }
`;
