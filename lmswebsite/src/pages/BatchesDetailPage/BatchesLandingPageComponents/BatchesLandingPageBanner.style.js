import styled from "styled-components";
import { Button } from "antd";
import { theme } from "../../../style/theme/theme";

// Main Wrapper for the LandingBranches Component
export const LandingBranchesWarp = styled.div`
  width: 90%;
  margin: auto;
  font-family: ${theme.typography.fontFamily};
  position: relative;

  .CountStudent {
    background: ${theme.colors.white};
    width: 15%;
    margin-left: 15em;
    margin-top: 12em;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    position: relative;
  }

  .CountStudentIcon {
    background: ${theme.colors.blue};
    color: ${theme.colors.white};
    font-size: 40px;
  }

  .countDetail {
    margin-left: 10px;
  }

  .content-overlay {
    position: absolute;
    width: 100%;
    margin-top: 5em;
  }

  .Neverbtn {
    font-size: 18px;
    background: rgba(255, 255, 255, 0.8);
    width: 30%;
    margin-left: 10em;
    position: relative;
    z-index: 2;
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 1em;
    color: ${theme.colors.black};
  }

  .btnratings {
    margin-top: 1em;
    position: relative;
    z-index: 2;
    display: flex;
  }

  @media (max-width: ${theme.breakpoints.xl}) {
    .Neverbtn {
      width: 25%;
      font-size: 16px;
    }
    .CountStudent {
      width: 20%;
      margin-left: 12em;
      margin-top: 12em;
    }
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    width: 100%;

    .Neverbtn {
      width: 25%;
      font-size: 16px;
    }
      .CountStudent {
        margin-top: 11em;
      }
            .StudentDetail {
      font-size: 14px;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    .Neverbtn {
      width: 30%;
      font-size: 14px;
      margin-left: 7em;
    }
    .btnratings {
      margin-top: 3em;
    }
    .CountStudent {
      width: 30%;
      margin-left: 10em;
      margin-top: 8em;
    }

    .StudentDetail {
      font-size: 14px;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    .Neverbtn {
      width: 40%;
    }
    .content-overlay {
      width: 100%;
    }

    .StudentDetail {
      font-size: 12px;
    }
    .CountStudent {
      width: 30%;
      margin-left: 2em;
      margin-top: 5em;
    }

    @media (max-width: ${theme.breakpoints.xs}) {
      .Neverbtn {
        width: 40%;
        margin-left: 3em;
      }
        .Count{
        font-size: 12px;
        }
      .CountStudent {
        width: 40%;
        margin-left: 1em;
        margin-top: 8.5em;
      }
    }
  }
`;

// Styled Component for the Banner Image
export const LandingBranchesImage = styled.img`
  width: 80%;
  height: 500px;
  margin: auto;

  @media (max-width: ${theme.breakpoints.md}) {
    height: 400px;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    width: 100%;
  }
`;

// Heading Style
export const BranchHeading = styled.h2`
  font-size: 40px;
  position: absolute;
  z-index: 2;
  width: 40%;
  margin-left: 5em;

  @media (max-width: ${theme.breakpoints.xl}) {
    font-size: 30px;
    margin-left: 6em;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 28px;
    margin-left: 6em;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 4em;
    font-size: 25px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 20px;
    margin-left: 5em;
    width: 50%;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    margin-left: 2em;
  }
`;

// Styled AntD Button
export const StyledButton = styled(Button)`
  padding: 25px 40px;
  font-size: 20px;
  background: ${theme.colors.pink4};
  color: ${theme.colors.white};
  border: none;
  margin-left: 10em;
  margin-top: 10em;
  border-radius: 10px;

  &:hover {
    background: ${theme.colors.pink4};
    color: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.xl}) {
    margin-left: 9em;
    margin-top: 10em;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 25px 35px;
    font-size: 18px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 14px;
    padding: 25px 40px;
    margin-left: 8em;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 14px;
    padding: 25px 40px;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    margin-left: 3em;
  }
`;