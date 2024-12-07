import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  `;
  
  export const Header = styled.h1`
    text-align: center;
    margin-bottom: 10px;
    color: #333;
  `;
  
  export const PackageDescription = styled.p`
    text-align: center;
    color: #555;
    margin-bottom: 30px;
    font-size: 1.1em;
  `;
  
  export const LoadingMessage = styled.div`
    font-size: 1.2em;
    text-align: center;
  `;
  
  export const ErrorMessage = styled.div`
    color: red;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
  `;
  
  export const PackageDetailsContainer = styled.div`    
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `;
  
  export const PackageDetail = styled.div`
    flex-basis: calc(50% - 20px);
    margin-bottom: 20px;
  `;
  
  export const PackageDetailTitle = styled.h3`
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #333;
  `;
  
  export const PackageDetailDescription = styled.p`
    font-size: 1em;
    color: #555;
  `;
  
  export const PackageDetailPrice = styled.p`
    font-size: 1.2em;
    margin-top: 10px;
    color: #333;
  `;
  
  export const PackageDetailButton = styled.button`
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  
    &:hover {
      background-color: #555;
    }
  `;
  
  export const BackButton = styled.button`
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  
    &:hover {
      background-color: #555;
    }
  `;
  
  export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;
  
  export const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;
  
  export const ErrorTitle = styled.h1`
    font-size: 2em;
    margin-bottom: 20px;
  `;
  
  export const ErrorDescription = styled.p`
    font-size: 1.2em;
    margin-bottom: 20px;
  `;

  export const PackageCard = styled.div`
    width: 100%;
    max-width: 300px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
  `;

  export const PackageFeatures = styled.ul`
    list-style-type: disc;
    padding-left: 20px;
    color: #555;
  `;

  export const PackageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  `;

  export const PackageImage    = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
  `;

  export const PackageMode = styled.p`
    color: #2980b9;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  export const PackagePrice = styled.p`
    color: #27ae60;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  export const PackageTitle = styled.h3`
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #333;
  `;

  export const SubjectTitle = styled.h3`
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #333;
  `;

  export const SubjectItem = styled.li`
    margin-bottom: 5px;
  `;
  
  export const SubjectList = styled.ul`
    list-style-type: circle;
    padding-left: 20px;
    color: #555;
  `;