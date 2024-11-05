import styled from "styled-components";
import { media } from "../../../../style/theme/theme";

export const ContactFormStylesWrap = styled.div`
  width: 35%;
  padding-right: 20px;

  .contact-forms {
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    ${media.md`
      width: 90%;
      padding: 15px;
    `}

    ${media.sm`
      width: 100%;
      padding: 10px;
      border-radius: 8px;
    `}
  }

  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.gray700};

    ${media.md`
      font-size: 0.9rem;
    `}

    ${media.sm`
      font-size: 0.85rem;
    `}
  }

  .sub-heading {
    margin: 5px 0 0;
    color: #6b7280;
    font-size: 0.85rem;

    ${media.md`
      font-size: 0.8rem;
    `}

    ${media.sm`
      font-size: 0.75rem;
    `}
  }

  .contact-list {
    list-style-type: none;
    padding: 20px;
    margin: 0;
  }

  .contact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    ${media.sm`
      margin-bottom: 10px;
      padding-bottom: 8px;
    `}
  }

  .contact-info {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;

    .contact-name {
      font-weight: bold;
      font-size: 0.95rem;

      ${media.md`
        font-size: 0.9rem;
      `}

      ${media.sm`
        font-size: 0.85rem;
      `}
    }

    .contact-email {
      color: #6b7280;
      font-size: 0.85rem;

      ${media.md`
        font-size: 0.8rem;
      `}

      ${media.sm`
        font-size: 0.75rem;
      `}
    }
  }

  .view-link {
    color: #f472b6;
    font-weight: bold;
    text-decoration: none;
    font-size: 0.9rem;
    white-space: nowrap;

    ${media.md`
      font-size: 0.85rem;
    `}

    ${media.sm`
      font-size: 0.8rem;
    `}
  }

  .see-all {
    display: block;
    margin-top: 10px;
    text-align: right;
    color: #f472b6;
    font-size: 0.85rem;
    text-decoration: none;
    font-weight: bold;

    ${media.md`
      font-size: 0.8rem;
    `}

    ${media.sm`
      font-size: 0.75rem;
    `}
  }
`;
