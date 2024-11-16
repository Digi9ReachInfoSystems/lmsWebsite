import React, { useState } from "react";
import {
  StudyMaterialsContainer,
  Heading,
  HeadingUnderline,
  ClassButtons,
  ClassButton,
  MaterialsGrid,
  MaterialCard,
  MaterialTitle,
  MaterialDescription,
} from "./StudyMaterials.styles";

const StudyMaterials = () => {
  const [activeButton, setActiveButton] = useState(0);

  const classes = [
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ];

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  return (
    <StudyMaterialsContainer>
      <Heading>Explore study materials</Heading>
      <HeadingUnderline />
      <ClassButtons>
        {classes.map((className, index) => (
          <ClassButton
            key={index}
            active={index === activeButton}
            onClick={() => handleButtonClick(index)}
          >
            {className}
          </ClassButton>
        ))}
      </ClassButtons>
      <MaterialsGrid>
        <MaterialCard className="previous-year">
          <MaterialTitle>Previous year</MaterialTitle>
          <MaterialDescription>question paper</MaterialDescription>
        </MaterialCard>
        <MaterialCard className="ncert">
          <MaterialTitle>NCERT</MaterialTitle>
          <MaterialDescription>books</MaterialDescription>
        </MaterialCard>
        <MaterialCard className="revision">
          <MaterialTitle>Revision</MaterialTitle>
          <MaterialDescription>notes</MaterialDescription>
        </MaterialCard>
        <MaterialCard className="general">
          <MaterialTitle>General</MaterialTitle>
          <MaterialDescription>knowledge</MaterialDescription>
        </MaterialCard>
      </MaterialsGrid>
    </StudyMaterialsContainer>
  );
};

export default StudyMaterials;
