import styled from "styled-components";
import { theme } from "../../../style/theme/theme";

export const BannerContainerWarp = styled.div`
  font-family: ${theme.typography.fontFamily};
  background-color: ${theme.colors.pink4};
  height: 80vh;
  width: 80vw;
  position: relative;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${theme.breakpoints.xxl}) {
    height: 95vh;
  }

  @media (max-width: ${theme.breakpoints.xl}) {
    height: 90vh;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    height: 85vh;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    background-color: ${theme.colors.pink3};
    width: 100%;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    height: 125vh;
  }
`;
export const BannerClip = styled.div`
  position: absolute;
  background: #fdfdfd; /* Light pink background */
  width: 100%;
  height: 80vh; /* Default height for larger screens */
  top: 0;
  clip-path: path(
    "M0,0 L2600,0 L1600,200 C1200,1200 900,400 700,500 C100,800 300,350 0,600 Z"
  ); /* Adjusted to match the shape you want */

  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    height: 75vh; /* Adjust height for extra-large screens */
    clip-path: path(
      "M0,0 L100%,0 L100%,300 C900,600 800,400 700,500 C600,600 400,350 0,300 Z"
    ); /* Slightly adjusted path for medium-large screens */
  }

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    height: 70vh; /* Adjust height for large screens */
    clip-path: path(
      "M0,0 L100%,0 L100%,350 C850,450 800,350 700,400 C600,450 400,250 0,200 Z"
    ); /* Path adjustment for large screens */
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: 60vh; /* Adjust height for medium screens */
    clip-path: path(
      "M0,0 L100%,0 L100%,400 C900,650 800,350 700,400 C600,450 400,250 0,200 Z"
    ); /* Adjust path for smaller devices */
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    height: 50vh; /* Adjust height for smaller screens */
    clip-path: path(
      "M0,0 L100%,0 L100%,450 C800,550 700,350 600,400 C500,450 300,300 0,200 Z"
    ); /* Slightly different path for very small screens */
  }
`;

export const CarouselWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  z-index: 2;

  .slick-list {
    border-bottom-left-radius: 20px; /* Apply border radius to bottom left */
    border-bottom-right-radius: 20px; /* Apply border radius to bottom right */
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xxl}) {
    width: 80%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    width: 85%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 90%;
  }
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 50vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.xl}) {
    height: 55vh;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    height: 45vh;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 35vh;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    height: 25vh;
  }
`;

export const BannerPopularCourses = styled.div`
  width: 78%;
  margin: 0 auto;
  z-index: 2;
  // height: 600px;
  margin-top: -20px;
  padding: 10px;
  background-color: ${theme.colors.white};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.xxl}) {
    width: 75%;
  }

  @media (max-width: ${theme.breakpoints.xl}) {
    width: 80%;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    width: 85%;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 90%;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    padding: 15px;
  }
`;

export const PopularCoursesHeader = styled.h2`
  margin: 10px 40px;
  font-size: 22px;
  font-weight: 500;
  font-family: ${theme.typography.fontFamily};
  color: ${theme.colors.navy};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 18px;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    text-align: center;
    font-size: 16px;
  }
`;

export const PopularCourses = styled.div`
  display: flex;
  gap: 20px;
  height: 12vh;
  margin-left: 20px;
  margin-right: 20px;

  padding: 10px; /* Add some padding for better spacing */

  white-space: nowrap; /* Ensure items are displayed in a single row */
  scrollbar-width: none;

  @media (max-width: ${theme.breakpoints.md}) {
    gap: 15px;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    margin: 0;
    gap: 10px;
  }
`;

export const PopularCourseCard = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 15%; /* Fixed width of each card */
  flex-shrink: 0; /* Prevent the card from shrinking when scrolling */

  @media (max-width: ${theme.breakpoints.lg}) {
    width: 150px; /* Keep the card width consistent on large screens */
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 150px; /* Keep the card width consistent on medium screens */
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    width: 100%; /* Full width for small screens */
    padding: 10px;
  }
`;

export const PopularCoursesClass = styled.h3`
  font-size: 14px;
  text-align: center;

  @media (max-width: ${theme.breakpoints.xs}) {
    font-size: 12px;
  }
`;

export const PopularCoursesPrice = styled.p`
  font-size: 18px;
  text-align: center;

  @media (max-width: ${theme.breakpoints.xs}) {
    font-size: 12px;
  }
`;

export const PopularCoursesName = styled.p`
  font-size: 16px;
  text-align: center;

  @media (max-width: ${theme.breakpoints.xs}) {
    font-size: 12px;
  }
`;

export const BannerStats = styled.div`
  width: 70%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 2;
  bottom: 0;
  /* Pink box-shadow */

  @media (max-width: ${theme.breakpoints.xl}) {
    width: 80%;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    margin: 50px;
    flex-wrap: wrap;
    gap: 20px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    margin: 40px auto;
    gap: 20px;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    gap: 15px;
  }
`;

export const StatsBatches = styled.div`
  // Default white background if not provided
  box-shadow: ${(props) =>
    props.boxShadow || "0 4px 8px rgba(0, 0, 0, 0.2)"}; // Default box shadow
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: center;
  background: ${theme.colors.white};
  border-radius: 10px;
  padding: 1rem;
  border: 2px solid #000;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 20%; // Adjust width for medium devices
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    width: 100%; // Full width for small devices
    padding: 0.5rem;
  }
`;

export const StatsBatchesIcon = styled.div`
  background-color: ${(props) =>
    props.bgColor || theme.colors.pink}; // Dynamic background color
  font-size: 2.5rem;
  color: ${(props) => props.color || theme.colors.black}; // Dynamic icon color
  margin-bottom: 0.5rem;
  padding: 10px 15px;
  border-radius: 50%; // Circular shape

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    font-size: 1.5rem;
  }
`;

export const TotalStatsBatches = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: ${theme.colors.navy};

  span {
    font-size: 1.2rem;
    color: ${theme.colors.black};

    @media (max-width: ${theme.breakpoints.xs}) {
      font-size: 1rem;
    }
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    font-size: 0.9rem;
  }
`;

export const ArrowButtonLeft = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${theme.colors.pink3};
  border: none;
  padding: 10px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: ${theme.colors.pink};
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    font-size: 1.2rem;
  }
`;

export const ArrowButtonRight = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${theme.colors.pink3};
  border: none;
  padding: 10px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: ${theme.colors.pink};
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    font-size: 1.2rem;
  }
`;
