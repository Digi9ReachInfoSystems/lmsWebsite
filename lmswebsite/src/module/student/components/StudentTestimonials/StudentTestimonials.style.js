import styled from "styled-components";

export const TestimonialsSectionWrapper = styled.section`
  padding: 60px 20px;
  background-color: white;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    font-size: 32px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const SectionSubtitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const TestimonialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TestimonialContent = styled.div`
  background-color: #fff;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  text-align: center;
  position: relative;

  @media (max-width: 1024px) {
    padding: 30px;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    max-width: 300px;
  }
`;

export const TestimonialImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #ff0080;
  object-fit: cover;
  margin: 0 auto 20px;

  @media (max-width: 1024px) {
    width: 70px;
    height: 70px;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

export const TestimonialQuote = styled.p`
  font-size: 18px;
  font-style: italic;
  color: #555;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const Rating = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #ffb400; /* Gold color */
  margin-right: 8px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Stars = styled.span`
  color: #ffb400;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const NavBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: #ff0080;
    transition: color 0.3s ease;
  }

  @media (max-width: 1024px) {
    font-size: 25px;
    padding: 5px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    padding: 5px;
  }
`;

export const LeftBtn = styled(NavBtn)`
  left: -50px;

  @media (max-width: 1024px) {
    left: -30px;
  }

  @media (max-width: 768px) {
    left: -20px;
  }

  @media (max-width: 480px) {
    left: -15px;
  }
`;

export const RightBtn = styled(NavBtn)`
  right: -50px;

  @media (max-width: 1024px) {
    right: -30px;
  }

  @media (max-width: 768px) {
    right: -20px;
  }

  @media (max-width: 480px) {
    right: -15px;
  }
`;

export const QuestionSection = styled.div`
  width: 80%;
  background-color: #d9b18e;
  height: 300px;
  padding: 50px 30px;
  margin-left: 100px;
  border-radius: 20px;
`;

export const QuestionTitle = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
`;

export const QuestionSubtitle = styled.div`
  font-size: 20px;
  width: 400px;
  margin-bottom: 20px;
`;

export const QuestionButton = styled.div`
  font-size: 24px;
  font-weight: 400;
  background-color: #000;
  color: #fff;
  border-radius: 20px;
  padding: 20px;
  width: 200px;
`;
