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

  // Fetch boards
  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      try {
        const response = await getBoards();
        setBoards(response); // Ensure response is an array of boards with unique `id`
        console.log("Boards fetched successfully:", response);
      } catch (err) {
        setError("Failed to fetch boards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  // Handle board selection
  const handleBoardSelect = (boardId) => {
    console.log("Selected Board ID:", boardId);
    setSelectedBoardId(boardId); // Update state with selected board ID
    const selectedBoard = boards.find((board) => board._id === boardId);
    localStorage.setItem("selectedBoard", JSON.stringify(selectedBoard)); // Save selected board
    console.log("local storage", localStorage.getItem("selectedBoard"));
    console.log("Selected Board:", selectedBoard);
  };

  // Continue Button
  
const navigate = useNavigate();

const handleContinue = () => {
  navigate("/classHomePage"); // Navigate to the /class route
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

        {/* Loading and Error States */}
        {loading && <p>Loading boards...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Boards List */}
        <div className="options-container">
          {boards.map((board) => (
            <div
              key={board.id} // Ensure each board has a unique id
              className={`skill-card ${
                selectedBoardId ===board._id ? "selected" : ""
              }`}
              onClick={() => {
                console.log("Selected Board IDbggggggg:", board._id);
                handleBoardSelect(board._id)
              }} // Set selected board
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
