import React from "react";
import { ToolbarCardContainer, Box } from "./ToolbarTeacher.style";
import { Link } from "react-router-dom";
import { MdQuiz, MdGroups, MdEvent, MdNotifications } from "react-icons/md"; // Importing icons

const ToolbarTeacher = () => {
  return (
    <ToolbarCardContainer>
      <Link to="/teacher/dashboard/quizz/assignedBatch">
        <Box>
          <MdQuiz size={24} style={{ marginRight: "8px"}}/>
          Quiz
        </Box>
      </Link>
      
      <Link to="/teacher/dashboard/meetings">
        <Box>
          <MdEvent size={24} style={{ marginRight: "8px" }} />
          Meetings
        </Box>
      </Link>
      
      <Link to="/teacher/dashboard/quizz/assignedBatch">
        <Box>
          <MdGroups size={24} style={{ marginRight: "8px" }} />
          Batches
        </Box>
      </Link>
      
      <Link to="/teacher/dashboard/circular">
        <Box>
          <MdNotifications size={24} style={{ marginRight: "8px" }} />
          Circulars
        </Box>
      </Link>
    </ToolbarCardContainer>
  );
};

export default ToolbarTeacher;
