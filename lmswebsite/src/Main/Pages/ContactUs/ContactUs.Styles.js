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
    width: 90%;
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

export const ContactInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  // background: ${theme.colors.white};
`;

export const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  margin-bottom: 20px;
  // margin-top: 20px;

  .contact-icon {
    font-size: 30px;
    color: black;
    cursor: pointer;
    transition: color 0.5s ease, transform 0.5s ease;
  }

  .contact-icon:hover {
    color: #00c897;
    transform: scale(1.2); /* Optional: Add a slight scaling effect */
  }

  p {
    font-size: 14px;
    line-height: 1.5;

    strong {
      font-size: 16px;
      color: #c00;
    }
  }
`;
