import styled from "styled-components";
import { BlockWrapStyles } from "../../../../style/DefaultStyles/DefaultStyles";
import { media } from "../../../../style/theme/theme";

export const CardBlockWrap = styled.div`
  ${BlockWrapStyles}

  .block-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .block-title {
      font-size: 1.5rem;
      color: ${(props) => props.theme.colors.black};
      font-weight: bold;

      ${media.md`
        font-size: 1.25rem;
      `}

      ${media.sm`
        font-size: 1rem;
      `}
    }
  }

  .dashboard-card {
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s;
    cursor: pointer;
    width: 15vw;
    height: 4.5vw;

    &:hover {
      transform: translateY(-5px);
    }

    ${media.lg`
      height: 55%; 
    `}

    ${media.md`
      height: 50%; 
    `}

    ${media.sm`
      height: 45%; 
    `}
  }

  .card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 100%;

    ${media.md`
      padding: 12px;
    `}

    ${media.sm`
      padding: 10px;
    `}
  }

  .card-icon {
    margin-top: 10px;
    width: 100px;
    height: 68px;
    border-radius: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 30px;
      height: 30px;

      ${media.md`
        width: 28px;
        height: 28px;
      `}

      ${media.sm`
        width: 24px;
        height: 24px;
      `}
    }

    ${media.md`
      width: 80px;
      height: 40px;
    `}

    ${media.sm`
      width: 70px;
      height: 35px;
    `}
  }

  .card-info {
    text-align: left;

    .card-title {
      font-size: 1rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.gray700};
      // margin-bottom: 4px;

      ${media.md`
        font-size: 0.5rem;
      `}

      ${media.sm`
        font-size: 0.85rem;
      `}
    }

    .card-count {
      font-size: 1.2rem;
      font-weight: bold;
      color: ${(props) => props.theme.colors.black};

      ${media.md`
        font-size: 1.75rem;
      `}

      ${media.sm`
        font-size: 1.5rem;
      `}
    }
  }
`;
