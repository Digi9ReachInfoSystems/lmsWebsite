import React, { useEffect, useState } from "react";
import {
  Form,
  FormField,
  Label,
  Input,
  IconInputContainer,
  Icon,
  // Button,
} from "./StudentAccountSetting.style";
import { FaUser } from "react-icons/fa"; // Example icon, using FontAwesome for the user icon
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import{getUserByAuthId}from "../../../../../api/userApi"
import{getStudentByAuthId}from "../../../../../api/studentApi"
import { updateUserByAuthId } from "../../../../../api/userApi";
import { BodyText, PageContainer, PrimaryButton, Subheading } from "../../../../../style/PrimaryStyles/PrimaryStyles";
import Animation from "../../../../student/assets/Animation.json";
import Lottie from "lottie-react";
import { set } from "lodash";
const StudentAccountSettings = () => {
  
  const [firstName, setFirstName] = useState("Student");
  const [userName, setUsername] = useState("student_k");
  const [email, setEmail] = useState("Student@gmail.com");
  const [phone, setPhone] = useState("7837292020");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    ////console.log("hello2"); 
    const apiCaller=async() => {
      const authId=JSON.parse(localStorage.getItem("sessionData")).userId;
      const DataStudent= await getStudentByAuthId(authId);
      //console.log(DataStudent);
      setFirstName(DataStudent.student.user_id.name);
      setUsername(DataStudent.student.user_id.email);
      setEmail(DataStudent.student.user_id.email);
      setPhone(DataStudent.student.phone_number);
    }
    apiCaller();
    setLoading(false);

  }, []);

  const handlePhoneChange = (e) => {
    // Ensure the input contains only numbers and the length doesn't exceed 10
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authId=JSON.parse(localStorage.getItem("sessionData")).userId;
    const responseUser = await updateUserByAuthId(authId,{name:firstName,phone_number:phone});
    alert("Profile updated successfully!");
    window.location.reload();
setLoading(false);
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "300px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // Scale down the animation using transform
            transform: "scale(0.5)", 
            transformOrigin: "center center",
          }}
        >
          <Lottie
            animationData={Animation}
            loop={true}
          />
        </div>
      </div>
    );
  }

  return (
 
 
     <Form>
      <Subheading>Account Settings</Subheading>
      <FormField>
       <BodyText> <Label>First Name</Label></BodyText>
        <IconInputContainer>
          <Icon>
            <FaUser />
          </Icon>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </IconInputContainer>
      </FormField>

      <FormField>
      <BodyText> <Label>UserName</Label></BodyText>
        <IconInputContainer>
          <Icon>
            <FaUser />
          </Icon>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setLastName(e.target.value)}
            readOnly
          />
        </IconInputContainer>
      </FormField>

      <FormField>
      <BodyText>  <Label>Email</Label></BodyText>
        <IconInputContainer>
          <Icon>
            <MdEmail />
          </Icon>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </IconInputContainer>
      </FormField>

      <FormField>
      <BodyText><Label>Phone Number</Label> </BodyText>
        <IconInputContainer>
          <Icon>
            <FaPhone />
          </Icon>
          <Input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            maxLength="10"
            pattern="\d{10}"
            placeholder="Enter 10-digit phone number"
          />
        </IconInputContainer>
      </FormField>
      <PrimaryButton onClick={handleSubmit}>Save Changes</PrimaryButton>
    </Form>
    
 );
};

export default StudentAccountSettings;
