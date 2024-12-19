import React, { useState, useEffect } from "react";
import "./BoardScreen.css";
import HeaderSection from "../NavBar/navbar";
import { getBoards } from "../../../api/boardApi";
import { useNavigate } from "react-router-dom";

function BoardScreen() {
  const [boards, setBoards] = useState([]); // State for fetched boards
  const [selectedBoardId, setSelectedBoardId] = useState(null); // Store selected board id
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      try {
        const response = await getBoards();
        setBoards(response);
      } catch (err) {
        setError("Failed to fetch boards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const handleBoardSelect = (boardId) => {
    setSelectedBoardId(boardId);
    const selectedBoard = boards.find((board) => board._id === boardId);
    localStorage.setItem("selectedBoard", JSON.stringify(selectedBoard));
  };

  const handleContinue = () => {
    navigate("/classHomePage");
  };

  return (
    <div>
      <HeaderSection />
      <div className="board-containers">
        <div className="header">
          <h3>
            <span className="black-text">Select Your</span>{" "}
            <span className="green-text">Board</span>
          </h3>
          <p>Choose Your Board</p>
        </div>

            {error && <p className="error-message">{error}</p>}

            <div className="options-container">
              {boards.map((board) => (
                <div
                  key={board._id}
                  className={`skill-card ${
                    selectedBoardId === board._id ? "selected" : ""
                  }`}
                  onClick={() => handleBoardSelect(board._id)}
                >
                  <div className="skill-icon"></div>
                  <h4>{board.name}</h4>
                  <p>{board.description}</p>
                </div>
              ))}
            </div>

        {/* Navigation */}
        <div className="navigation">
          <button
            className="next-btn"
            // disabled={!selectedBoardId}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progressBar">
          <div className="progress" style={{ width: "20%" }}></div>
        </div>
        <p className="step-info">Step 1 out of 5</p>
      </div>
    </div>
  );
}

export default BoardScreen;
