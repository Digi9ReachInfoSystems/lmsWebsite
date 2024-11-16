import React from "react";
import { TeacherdashBoardCardswrap } from "./TeacherdashBoardCards.styles";
import { BlockContentWrap } from "../../../../style/DefaultStyles/DefaultStyles";
import { ImUser } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import { MdLiveTv } from "react-icons/md";

// Define icon mappings for each title
const iconMap = {
  "Total students": <ImUser />,
  "Total teachers": <GiTeacher />,
  "Total Batches": <MdLiveTv />,
};

const TeacherdashBoardCards = ({ cardsData }) => {
  return (
    <TeacherdashBoardCardswrap>
      {/* <BlockContentWrap> */}
      <div className="cards">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className={`card-item`}
            // style={{ backgroundColor: card.background }}
          >
            <div className="card-content">
              <div
                className="card-item-icon"
                style={{ backgroundColor: card.background }}
              >
                {iconMap[card.title] || <ImUser />} {/* Fallback icon */}
              </div>
              <div className="card-text-content">
                <p className="card-item-text">{card.title}</p>
                <div className="card-item-value">{card.count}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* </BlockContentWrap> */}
    </TeacherdashBoardCardswrap>
  );
};

export default TeacherdashBoardCards;
