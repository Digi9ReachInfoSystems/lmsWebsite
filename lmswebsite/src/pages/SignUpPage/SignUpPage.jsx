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
  const [role, setRole] = useState("teacher");
  const [classes, setClasses] = useState([]);
  const [board, setBoard] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [studentProfileImage, setStudentProfileImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardData = await getBoards();
        console.log("Fetched Boards:", boardData);
        setBoard(boardData);
      } catch (error) {
        console.error("Error fetching boards:", error);
        message.error("Failed to load boards. Please try again later.");
      }
    };

    fetchBoards();
  }, [role]);

  useEffect(() => {
    const fetchClasses = async () => {
      if (selectedBoard) {
        try {
          const classData = await getClassesByBoardId(selectedBoard);
          console.log("classData", classData);
          setClasses(classData || []);
        } catch (error) {
          console.error("Error fetching classes:", error);
        }
      } else {
        setClasses([]);
      }
    };
    fetchClasses();
  }, [selectedBoard]);

  const handleSignUp = () => {
    form.submit();
  };


  const onFinish = async (values) => {
    console.log("Form Values:", values);
    createFireBaseUserWithEmailAndPassword(role, values.email, values.password, values);
  };

  const createFireBaseUserWithEmailAndPassword = async (role, email, password, values) => {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      sendEmailVerification(userCredential.user)
      .then(() => {
        // Verification email sent
        console.log("Verification email sent!");
        alert("Verification email sent! Please check your inbox.");
      })
      .catch((error) => {
        // Handle any errors related to sending the verification email
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error sending verification email:", errorCode, errorMessage);
        alert("Error sending verification email. Please try again.");
      });
      console.log("User created:", userCredential);
      const user = userCredential.user;
      
      localStorage.setItem("sessionData", JSON.stringify({ accessToken: user.accessToken ,refreshToken: userCredential._tokenResponse.refreshToken}));
      console.log("role", role);

      if (role === "teacher") {
        const data = {
          role: role,
          access_token: user.accessToken,
          refresh_token: userCredential._tokenResponse.refreshToken,
        };
        await signupUser(data);
        localStorage.clear();
        navigate("/login");
      } else if (role === "student") {
        const downloadUrl = await uploadFileToFirebase(
          values.profile_image[0].originFileObj,
          "studentProfile"
        );
        const data = {
          role: role,
          access_token: user.accessToken,
          refresh_token: userCredential._tokenResponse.refreshToken,
          class_id: values.class_id,
          profile_image: downloadUrl,
          phone_number: values.phone_number,
          student_name: values.student_name,
          studentGender: values.studentGender,
          studentDOB: values.studentDOB,
          board_id: values.board_id,
        };
        console.log("Student Data:", data);
        await signupUser(data);
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Registration error:", errorCode, errorMessage);
      message.error(`Registration failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="MainContainer"></div>
      <FormSection>
        <Heading>Welcome</Heading>
        <p className="subHeading">Register Your Account To Continue</p>

        <Tabs defaultActiveKey="student" centered size="large">
          <TabPane tab="Student" key="student">
            <ScrollableForm>
              <StudentForm boards={board} navigate={navigate} />
            </ScrollableForm>
          </TabPane>
          <TabPane tab="Teacher" key="teacher">
            <ScrollableForm>
              <TeacherForm boards={board} navigate={navigate} />
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
