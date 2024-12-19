import styled from "styled-components";
import { theme, media } from "../../../style/theme/theme";

export const ContactUsWarp = styled.div`
  background: ${theme.colors.white};
  width: 100%;

  display: flex;
  flex-direction: row;

  ${media.sm`
  flex-direction:column;
  `}
`;

export const ContactContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;

  ${media.sm`
    width: 100%;
    `}
`;

export const ContactForm = styled.div`
  /* border: 2px solid ${theme.colors.frenchGray}; */
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7); */
  padding: 20px;
  width: 80%;

  .ContactButton {
    width: 100%;
    background: #00c897;
    color: #fff;
    border: none;

    &:hover {
      border: none;
      color: #fff;
      background-color: #47ff60;
    }
  }

  :where(.css-dev-only-do-not-override-49qm).ant-btn-variant-outlined:not(
      :disabled
    ):not(.ant-btn-disabled):hover {
    background: #01edb2;
    color: #fff;
  }

  /* .input{
    width: 600px;
    float: right;

    ${media.xxl`
    width:500px;
    `}
    ${media.xl`
    width:500px;
    `}
    ${media.lg`
    width:500px;
    `}
    ${media.md`
    width:500px;
    `}
    ${media.sm`
    width:400px;
    `}
    ${media.xs`
    width:400px;
    `}
  } */
`;

export const ContactImageContainer = styled.div`
  width: 40%;
  height: 80vh;
  /* background: ${theme.colors.gray700}; */
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.sm`
    width: 100%;
    `}
`;

export const Image = styled.img`
  width: 300px;
  height: 300px;
`;
