import React from "react";
import {
  TeacherContainer,
  TeacherContentWrapper,
  TeacherImage,
  TeacherTextContent,
  TeacherTitle,
  TeacherSubtitle,
  Image,
  TeacherCardContainer,
  TeacherCard,
  TeacherDetails,
  Experience,
  Name,
  Subject,
} from "./BatchesExpertTeachers.style";
import ExpertsImage from "../assets/Experts.png"; // Adjust the path based on your project structure
import { IoLogoMicrosoft } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { Margin } from "@mui/icons-material";

const ExpertTeachers = ({ data }) => {
  return (
    <TeacherContainer>
      <TeacherContentWrapper>
        <TeacherImage
          src={ExpertsImage}
          alt="Expert Teachers"
        //   style={{ marginLeft: "50px", width: "500px" }}
        />
        <TeacherTextContent>
          <p
            style={{
              color: "#00c897",
              fontSize: "1.2em",
              backgroundColor: "#D64DC714",
              width: "90px",
              borderRadius: "5px",
            }}
          >
            <p style={{ marginLeft: "10px" }}>Mentors</p>
          </p>
          <TeacherTitle>Meet Our Expert Teachers</TeacherTitle>
          <TeacherSubtitle>
            <Image>
            <IoLogoMicrosoft style={{ width: "20px", height: "20px" , color: "#00c897" }} />
            </Image>
            <div>
            <p>Provided with good study material and references </p>
            <p>in toppers academy.</p>
            </div>
            
            
          </TeacherSubtitle>
          <TeacherSubtitle>
            <Image>
            <RiCheckboxMultipleBlankFill style={{ width: "20px", height: "20px" , color: "#00c897" }} />
            </Image>
            <div>
                <p>One to one live classes focusing on the single</p>
                <p>individual career.</p>
            </div>
             
          </TeacherSubtitle>
          <TeacherSubtitle>
            <Image>
            <HiMiniUserGroup style={{ width: "20px", height: "20px" , color: "#00c897"}} />
            </Image>
            <div>
                <p>Over 50,000 students have achieved a 100% success rate</p>
                <p>    with toppers
                academy.</p>
            </div>
         
          </TeacherSubtitle>
        </TeacherTextContent>
      </TeacherContentWrapper>

      {/* <TeacherCardContainer>
        {data?.slice(-3).map((teacher) => (
          <TeacherCard key={teacher._id}>
            <img src={teacher.profile_image} alt={`Teacher ${teacher.name}`} />
            <TeacherDetails>
              <Name>{teacher.user_id.name}</Name>
              <Subject>{teacher.qualifications}</Subject>
              <Experience>{teacher.experience} Years of Experience</Experience>
            </TeacherDetails>
          </TeacherCard>
        ))}
      </TeacherCardContainer> */}
    </TeacherContainer>
  );
};

export default ExpertTeachers;
