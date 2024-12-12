import styled from 'styled-components';

export const Container = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
`;



export const Header = styled.header`
  background: #00a0dc;
  color: #fff;
  padding: 20px;

  h1 {
    margin: 0;
    font-size: 24px;
  }

  p {
    margin: 5px 0 0;
    font-size: 16px;

    a {
      color: #fff;
      text-decoration: underline;
    }
  }
`;

export const Content = styled.div`
  padding: 20px;

  h2 {
    color: #2d3a45;
  }

  p {
    line-height: 1.6;
  }

  a {
    color: #00a0dc;
    text-decoration: underline;
  }
`;


