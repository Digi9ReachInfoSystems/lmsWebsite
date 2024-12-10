import styled from "styled-components";

// Container for the testimonials section
export const TestimonialContainer = styled.div`
  text-align: center;
  padding: 50px 20px;
`;

// Title of the testimonials section
export const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
`;

// Subtitle for additional context
export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  //   margin-bottom: 40px;
`;

// List container for testimonials
export const TestimonialList = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

// Individual testimonial card
export const TestimonialCard = styled.div`
//   background-color: ${(props) => (props.isPink ? "#ffe5f0" : "#ffffff")};
  border-radius: 10px;
  //   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Profile image for the testimonial
export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
  object-fit: cover;
  margin: auto;
`;

// Name of the client
export const ClientName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 5px 0;
`;

// Profession of the client
export const Profession = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
`;

// Testimonial text
// export const TestimonialText = styled.p`
//   font-size: 0.9rem;
//   color: #444;
//   margin: 15px 0 10px;
//   line-height: 1.5;
// //   background-color: pink;
// //   width: auto;
// //   height: auto;
// `;


// Testimonial text
export const TestimonialText = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin: 15px 0 10px;
  line-height: 1.5;
  background-color: ${(props) => (props.isPink ? "#FF849C" : "#ffe5f0")}; /* Apply alternating background */
  padding: 10px;
//   border-radius: 8px;
  transition: background-color 0.3s ease;
`;


// Dots container for navigation
export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// Individual dot for navigation
export const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => (props.active ? "#FF849C" : "#ffe5f0")};
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #ccc;


  &:hover {
    background-color: #666;
  }
`;

// Rating (star icons)
export const RatingContainer = styled.div`
  margin-top: 10px;
  color: #ffd700; /* Gold color for stars */
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  gap: 2px;
`;
