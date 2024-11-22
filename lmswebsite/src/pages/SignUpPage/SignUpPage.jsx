import React, { useEffect, useState } from "react";
import {
  Container,
  ImageSection,
  FormSection,
  RoleSelection,
  Input,
  Button,
  LinkText,
  StudentSelects,
} from "./SignUpPage.style";
import SignUpImage from "../../assets/SignUpImage.png"; // Import image
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signupUser } from "../../api/authApi";
// import {Select} from "antd";
import Select from "react-select";
import { getClasses } from "../../services/createBatch";
import{uploadFileToFirebase} from "../../utils/uploadFileToFirebase"
import { getBoards } from "../../api/boardApi";
import { getClassesByBoardId } from "../../api/classApi";

const SignUpPage = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentDOB, setStudentDOB] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentProfileImage, setStudentProfileImage] = useState("");
  const [classes, setClasses] = useState([]);
  const [board, setBoard] = useState([]);
  const[selectedBoard, setSelectedBoard] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      const boardData = await getBoards();
      console.log("boardData", boardData);
      setBoard(boardData);
      // const classData = await getClasses();
      // setClasses(classData || []);
    };
    fetchClasses();
  }, [role])
  useEffect(() => {
    const fetchClasses = async () => {
      setClasses([]);
      const classData = await getClassesByBoardId(selectedBoard);
      console.log("classData", classData);
      setClasses(classData || []);
    };
    fetchClasses();
  }, [selectedBoard]);

  const handleSignUp = (e) => {

    e.preventDefault();
    // Handle sign-up logic here
    console.log("Sign Up:", { role, email, password });
    createFireBaseUserWithEmailAndPassword(role, email, password);

    // if(role==="Teacher"){

    // }
  };
  const handleFileChange = async(e) => {
    console.log("functionn called");
    const { files } = e.target;
    // setBatch_image(files[0]);
    const downloadUrl = await uploadFileToFirebase(files[0], "studentProfile");
    console.log("downloadUrl", downloadUrl);
    setStudentProfileImage(downloadUrl);
  };
  async function createFireBaseUserWithEmailAndPassword(role, email, password) {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
      console.log("User created:", user);
      localStorage.setItem("sessionData", JSON.stringify({ accessToken: user.user.accessToken }));
      console.log("role", role);

      if (role === "teacher") {
        const data = {
          role: role,
          access_token: user.user.accessToken,
          refresh_token: user._tokenResponse.refreshToken,
        }
        await signupUser(data);
        localStorage.clear();
        navigate("/login");
      }else if(role === "student"){
        const data = {
          role: role,
          access_token: user.user.accessToken,
          refresh_token: user._tokenResponse.refreshToken,
          class_id: studentClass,
          profile_image: studentProfileImage,
          phone_number: phoneNumber,
          student_name: studentName,
          studentGender: studentGender,
          studentDOB: studentDOB,
          board_id: selectedBoard
        }
        console.log(data);
        await signupUser(data);
        localStorage.clear();
        navigate("/login");
      }

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Registration error:", errorCode, errorMessage);
    }
  

    // then((userCredential) => {
    //   // User is created
    //   const user = userCredential.user;
    //   console.log("User created:", user);
    //   // Send verification email (optional)
    //   // user.sendEmailVerification().then(() => {
    //   //   console.log("Verification email sent.");
    //   // });
    //   // Handle successful registration logic here
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.error("Registration error:", errorCode, errorMessage);
    //   // Handle registration errors here
    // });

  }

  return (
    <Container>
      <ImageSection>
        <img src={SignUpImage} alt="Books with Medal" />
      </ImageSection>
      <FormSection>
        <h2>Sign Up</h2>
        <p>
          Join us and get more benefits. We promise to keep your data safely.
        </p>
        <RoleSelection>
          <div className="line-wrapper">
            <span>Are you?</span>
          </div>
          {/* Wrapping buttons in a container to display them inline */}
          <div className="button-container">
            <button
              onClick={() => setRole("student")}
              className={role === "Student" ? "active" : ""}
            >
              Student
            </button>
            <button
              onClick={() => setRole("teacher")}
              className={role === "Teacher" ? "active" : ""}
            >
              Teacher
            </button>
          </div>
        </RoleSelection>
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {
          role === "student" &&
          <>
          <Input
           placeholder="Upload Profile Image"
           type="file" 
           onChange={handleFileChange}  
           required
            />
            <Input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Student email"
              value={email}
              readOnly
           
            />
            <Input
              type="tel"
              placeholder="Student phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required

            />
            <Input
              type="date"
              placeholder="Student Date of Birth"
              value={studentDOB}
              onChange={(e) => setStudentDOB(e.target.value)}
              required

            />
            <StudentSelects>
              <Select
                placeholder="Select Board"

                options={board.map((board) => ({
                  value: board._id,
                  label: board.name,
                }))}
                onChange={(option) => setSelectedBoard(option.value)}
                required
              />
            </StudentSelects>
           
            <StudentSelects>
              <Select
                placeholder="Select gender"

                options={[{
                  value: "male",
                  label: "Male",
                }, {
                  value: "female",
                  label: "Female",
                }]}
                onChange={(option) => setStudentGender(option.value)}
                required
              />
            </StudentSelects>

            <StudentSelects>
              <Select
                placeholder="Select Class"

                options={classes.map((cls) => ({
                  value: cls._id,
                  label: cls.classLevel,
                }))}
                onChange={(option) => setStudentClass(option.value)}
                required
              />
            </StudentSelects>
          </>


        }
        <Button onClick={handleSignUp}>Create Account</Button>
        <p>
          Already have an Account? <LinkText href="/login">Log in</LinkText>
        </p>
      </FormSection>
    </Container>
  );
};

export default SignUpPage;
