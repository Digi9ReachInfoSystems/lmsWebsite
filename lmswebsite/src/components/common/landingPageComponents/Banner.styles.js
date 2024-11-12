import styled from "styled-components";

export const BannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    min-height: 100vh;
    margin-top: -35px;
`;

export const InnerContainer = styled.div`
    width: 80%;
    background-color: #ffcce0;
    position: relative;
`;

export const Wave = styled.div`
    position: absolute;
    bottom: -40px;
    width: 100%;
    height: 50vh;
    background-color: #ff4081;
    clip-path: path("M0,6 C240,320 480,0 720,80 C960,160 1200,64 1440,120 L1440,300 L0,300 Z");
`;

export const SliderItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const BannerImage = styled.img`
    width: 50%;
    height: auto;
    max-height: 250px;
    object-fit: cover;
    margin-left: 280px;

    @media (max-width: 1200px) {
        margin-left: 0;
        width: 60%;
    }

    @media (max-width: 768px) {
        width: 70%;
    }

    @media (max-width: 480px) {
        width: 90%;
        margin-left: 0;
    }
`;

export const BannerText = styled.p`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #000;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.2rem;
    text-align: center;
    width: 80%;

    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 8px 16px;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
        padding: 6px 12px;
    }
`;

export const CoursesBackground = styled.div`
    position: relative;
    background-color: white;
    width: 60%;
    margin-left: 220px;
    margin-top: 60px;
    border-radius: 20px;
    border: 1px solid black;
`;

export const CoursesTitle = styled.h2`
    margin-left: 50px;
`;

export const CoursesSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #ffb6c1;
    transition: transform 0.2s;
    flex: 1 1 calc(20% - 20px);
    max-width: calc(20% - 20px);
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex: 1 1 80%;
        max-width: 80%;
    }

    @media (max-width: 480px) {
        width: 100%;
        margin: 5px 0;
    }
`;

export const StatsSection = styled.div`
    position: relative;
    padding-top: 50px;
`;

export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
`;

export const CardStatistics = styled.div`
    background-color: white;
    color: rgb(192, 0, 144);
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
