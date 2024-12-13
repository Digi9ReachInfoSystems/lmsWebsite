import React from "react";
import { ToolbarCardContainer, Box } from "./ToolbarTeacher.style";
import { Link } from "react-router-dom";
import { MdQuiz, MdGroups, MdEvent, MdNotifications } from "react-icons/md"; // Importing icons

const ToolbarTeacher = () => {
  return (
    <ToolbarCardContainer>
      <Link to="/teacher/dashboard/quizz/assignedBatch">
        <Box>
          <MdQuiz className="quiz-icon"/>
          Quiz
        </Box>
      </Link>
      
      <Link to="/teacher/dashboard/meetings">
        <Box>
          <MdEvent className="quiz-icon"/>
          Meetings
        </Box>
      </Link>
      
      <Link to="/teacher/dashboard/quizz/assignedBatch">
        <Box>
          <MdGroups className="quiz-icon"/>
          Batches
        </Box>
      </Link>
      
      <Link to="/teacher/dashboard/circular">
        <Box>
          <MdNotifications className="quiz-icon" />
          Circulars
        </Box>
      </Link>
    </ToolbarCardContainer>
  );
};

export default ToolbarTeacher;
