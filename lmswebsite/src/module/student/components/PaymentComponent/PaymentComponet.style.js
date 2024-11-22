import styled from "styled-components";
import {theme, media} from "../../../../style/theme/theme";



export const EnrollButton = styled.button`
  background-color: #fff;
  color: #aa8b70;
  width: 20%;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid #aa8b70;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background-color: #e0486d;
  }

  /* Media Queries */

  @media (max-width: 990px) {
    width: 25%;
  }

  @media (max-width: 768px) {
    width: 38%;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 5px 10px;
    font-weight: 600;
    width: 35%;
  }
`;
