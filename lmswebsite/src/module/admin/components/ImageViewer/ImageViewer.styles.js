import styled from "styled-components";
import { theme, media } from "../../../../style/theme/theme";

export const ImageViewerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Centers content vertically in full viewport height */
  background-color: ${theme.colors.backgroundLight}; /* Light background color */

  .imageURL-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border: 2px solid ${theme.colors.gray300};
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: ${theme.colors.white};

    ${media.md`
      padding: 12px;
      width: 90%; /* Container adjusts width on smaller screens */
    `}

    ${media.sm`
      padding: 8px;
      width: 100%;
    `}
  }

  .imageURL-image {
    width: 300px;
    height: 300px;
    border-radius: 8px;
    object-fit: cover; /* Keeps aspect ratio */
    cursor: pointer; /* Indicates clickability for modal opening */

    ${media.md`
      width: 200px;
      height: 200px;
    `}

    ${media.sm`
      width: 150px;
      height: 150px;
    `}
  }

  /* Modal styling */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;

    .modal-content {
      position: relative;
      padding: 20px;
      background: ${theme.colors.white};
      border-radius: 10px;
      max-width: 500px;
      width: 90%;
      text-align: center;

      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.5rem;
        cursor: pointer;
        color: ${theme.colors.gray700};

        &:hover {
          color: ${theme.colors.gray900};
        }
      }

      .modal-image {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin-top: 10px;
      }
    }
  }
`;
