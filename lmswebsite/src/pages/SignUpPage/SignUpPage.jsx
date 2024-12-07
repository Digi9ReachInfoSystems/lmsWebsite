import React, { useEffect, useState } from "react";
import {
  Container,
  ImageSection,
  FormSection,
  ScrollableForm,
  Heading,
} from "./SignUpPage.style";
import SignUpImage from "../../assets/SignUpImage.png"; // Import image
import { Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getBoards } from "../../api/boardApi";
import StudentForm from "../SignUpPage/signUpPageStudentForm";
import TeacherForm from "../SignUpPage/signUpPageTeacherForm";

const { TabPane } = Tabs;

const SignUpPage = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardData = await getBoards();
        console.log("Fetched Boards:", boardData);
        setBoards(boardData);
      } catch (error) {
        console.error("Error fetching boards:", error);
        message.error("Failed to load boards. Please try again later.");
      }
    };

    fetchBoards();
  }, []);

  return (
    <Container>
      <div className="MainContainer"></div>
      <FormSection>
        <Heading>Welcome</Heading>
        <p className="subHeading">Register Your Account To Continue</p>

        <Tabs defaultActiveKey="student" centered size="large">
          <TabPane tab="Student" key="student">
            <ScrollableForm>
              <StudentForm boards={boards} navigate={navigate} />
            </ScrollableForm>
          </TabPane>
          <TabPane tab="Teacher" key="teacher">
            <ScrollableForm>
              <TeacherForm boards={boards} navigate={navigate} />
            </ScrollableForm>
          </TabPane>
        </Tabs>
      </FormSection>
      <ImageSection>
        <img src={SignUpImage} alt="Sign Up" />
      </ImageSection>
    </Container>
  );
};

export default SignUpPage;
