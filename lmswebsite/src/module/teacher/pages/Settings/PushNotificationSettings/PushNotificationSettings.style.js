import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Add box-shadow to the main container */

  h2 {
    margin-bottom: 4vh;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Align the name on the left and toggle on the right */
  align-items: center;
  width: 40%; /* Set width of the container to 40% */
  padding: 3vh 3vw;
  margin: 3vh 3vw;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#e0f7fa" : "transparent")};
  border-radius: 5px;
  transition: background-color 0.3s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add box-shadow to the individual toggle container */

  &:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 1200px) {
    width: 50%; /* Adjust width for medium screens */
  }

  @media (max-width: 768px) {
    width: 90%; /* Adjust width for smaller screens */
    justify-content: center; /* Center the contents */
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width on very small screens */
    padding: 8px 0; /* Adjust padding for small screens */
  }
`;

export const ToggleLabel = styled.label`
  font-size: 1.5rem;
  color: #333;
  flex: 1; /* Allow label to take up the available space */

  @media (max-width: 768px) {
    padding: 1vh 1vw;
    font-size: 1.3rem; /* Slightly smaller font size on medium screens */
  }

  @media (max-width: 480px) {
    padding: 3vh 3vw;
    font-size: 1.1rem; /* Even smaller font size on smaller screens */
  }
`;

export const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${(props) =>
    props.active ? "#FA5A7D" : "#ccc"}; /* Active color */
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  span {
    position: absolute;
    top: 2px;
    left: ${(props) =>
      props.active ? "26px" : "2px"}; /* Position for active state */
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
