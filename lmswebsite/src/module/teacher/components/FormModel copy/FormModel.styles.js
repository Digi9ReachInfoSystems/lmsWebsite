import { media, theme } from "../../../../style/theme/theme";
import styled from "styled-components";

export const FormModelWrap = styled.div`
  .Form-model-overlay {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 5vh;
    left: 30vw;
    //    right: 0;
    bottom: 0;
    box-shadow: 0 2px 10px ${(props) => props.theme.colors.frenchGray};
    background-color: #fff;
    max-width: 900px;
    width: 100%;
    max-height: 100vh;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Ensure it's on top */
    overflow-y: auto;

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    &::-webkit-scrollbar {
      /* WebKit */
      width: 0;
      height: 0;
    }
    ${media.md`
     max-width: 500px;
    `}

    ${media.xs`
     max-width: 400px;
    `}
  }
  .Form-model-container {
    margin-top: 100px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 900px;
    max-height: 100vh;
    width: 100%;
    position: relative;
  }
  .Form-model-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    &:hover {
      transform: rotate(90deg);
    }
  }
`;
