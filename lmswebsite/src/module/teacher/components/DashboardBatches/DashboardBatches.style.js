import styled from "styled-components";
import {theme, media} from "../../../../style/theme/theme";
export const StyledDashboard = styled.div`
    width: 200%;
    // padding: 20px;
    padding-top: 20px;
    box-sizing: border-box;
    font-family: Arial, sans-serif;

    h2 {
        margin-bottom: 10px;
        font-size: 24px;
        color: #333;
    }

    p {
        margin: 5px 0;
        font-size: 16px;
    }

    ${media.md`
        padding: 10px;
    `}
    ${media.sm`
        padding: 5px;
    `}
    ${media.xs`
        padding: 5px;
    `}

`;

export const ErrorMessage = styled.p`
    color: red;
    margin-top: 10px;
`;

export const MainCardContainer = styled.div`
    width: 50%;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    position: relative;

    
`;

export const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    // justify-content: space-between;
    margin-bottom: 20px;
`;

export const Card = styled.div`
    width: calc(25% - 20px); /* 4 cards in a row */
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const CardImage = styled.img`
    width: 100%;
    height: 90px;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
`;

export const CardTitle = styled.h3`
    margin: 10px 15px 5px;
    font-size: 18px;
    color: #333;
                text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export const CardContent = styled.div`
    padding: 0 15px 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;


    
`;

export const CardDetail = styled.p`
    margin: 0;
    font-size: 14px;
    color: #555;
  

    p {
        color: #333;
         text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    }
`;

export const ViewAllButton = styled.button`
    position: absolute;
    bottom: 3px;
    right: 20px;
    background-color: #DCFCE7;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

        // &:hover {
        //     background-color: #C5A8FF;
        // }
`;
