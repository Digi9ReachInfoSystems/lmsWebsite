import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, Input, Alert } from "antd";
import { auth } from "../../config/firebaseConfig";
import { getUserByAuthId } from "../../api/userApi";
import {
  LoginPageWrap,
  Container,
  LoginFormContainer,
  Title,
  SubTitle,
  LoginButton,
  ForgotPassword,
  SubTitle1,
} from "./Login.styles";
import bgImg from "../../assets/image 32.png"; // The background image
import { getStudentByAuthId } from "../../api/studentApi";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { email, password } = values;
    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      localStorage.setItem(
        "sessionData",
        JSON.stringify({ accessToken: user.accessToken })
      );

      const profileData = await getUserByAuthId(user.uid);

      const sessionData = {
        userId: user.uid,
        accessToken: user.accessToken,
        refreshToken: profileData.user.refresh_token,
        name: profileData.user.name,
        loggedIn: "true",
      };

      localStorage.setItem("sessionData", JSON.stringify(sessionData));

      if (profileData.user.role === "admin") navigate("/admin");
      else if (profileData.user.role === "student") {
        const studentData= await getStudentByAuthId(user.uid);
       console.log(" login studentData",studentData);
       
        if(studentData.student.custom_package_status == "no_package"&&studentData.student.is_paid==false){
          navigate("/paymentScreen")
        }else{
          navigate("/student/dashboard");
        }
        // navigate("/student");

      }
      else if (profileData.user.role === "teacher") navigate("/teacher");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <LoginPageWrap style={{ backgroundImage: `url(${bgImg})` }}>
      {/*
       */}

      <LoginFormContainer>
        <Title>Welcome Back 👋 </Title>
        <SubTitle>Please sign-in to your account and start learning </SubTitle>
        <Form className="login-textfields" onFinish={handleLogin}>
          <p className="caption">EMAIL</p>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <p className="caption">PASSWORD</p>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Link to="/forgot-password"><ForgotPassword>Forgot Password?</ForgotPassword></Link>
         
          {errorMessage && <Alert message={errorMessage} type="error" />}
          <LoginButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </LoginButton>
        </Form>
        <SubTitle1>
          New on our platform? <a href="/signup">Create Account</a>
        </SubTitle1>
      </LoginFormContainer>
      <Container />
    </LoginPageWrap>
  );
};

export default Login;
