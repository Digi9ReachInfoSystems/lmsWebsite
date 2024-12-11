import styled from "styled-components";

export const BatchCardWrap = styled.div`
  .batch-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 350px;
    transition: all 0.3s ease;
    margin: 20px;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    }
  }

  .batch-image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-bottom: 2px solid #f1f1f1;
  }

  .batch-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  .batch-content {
    padding: 20px;
  }

  .batch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .batch-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 0;
  }

  .batch-date {
    font-size: 14px;
    color: #888;
  }

  .batch-details {
    margin-top: 10px;
    font-size: 14px;
    color: #555;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .teacher-name {
    font-weight: 500;
    color: #333;
  }

  .student-count {
    font-weight: 400;
    color: #777;
  }

  .batch-action {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .action-button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #45a049;
    }
  }
`;
