import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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
} from "./ForgotPassword.styles";
import bgImg from "../../assets/image 32.png"; // The background image
import { getStudentByAuthId } from "../../api/studentApi";
import { set } from "lodash";


const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [mailSent, setMailSent] = useState(false)
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10); // Countdown from 10 seconds
    const [form] = Form.useForm();
    useEffect(() => {
        setMailSent(false);
        setIsResetting(false);
        setCountdown(10); // Initialize countdown
    }, [])
     // Handle countdown and navigation when mail is sent
     useEffect(() => {
        let timer;
        if (mailSent) {
            setCountdown(10); // Initialize countdown
            timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        navigate("/login");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer); // Cleanup on unmount or when mailSent changes
    }, [mailSent]);
    const handleResetPassword = async (values) => {
        const { email } = values;
        setIsResetting(true); // Start loading
        try {
            await sendPasswordResetEmail(auth, email);
            setMailSent(true);
            setIsResetting(false);
            setTimeout(() => {
              
                setMailSent(false);
                form.resetFields(['email']);
            }, 10000);

        } catch (error) {
            console.error("Password reset error:", error);
            setErrorMessage("Incorrect email  Please try again.");
        } finally {
            setIsResetting(false); // Stop loading
        }

    };

    return (
        <LoginPageWrap style={{ backgroundImage: `url(${bgImg})` }}>
            {/*
       */}

            <LoginFormContainer>

                {<>

                    <Title>Reset Password </Title>
                    {!mailSent ? <SubTitle>Enter your email to reset your password</SubTitle> : <SubTitle>Password reset mail sent successfully</SubTitle>}
                    <Form form={form}  className="login-textfields" onFinish={handleResetPassword}>
                        <p className="caption">EMAIL</p>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Please input your email!" }]}

                        >
                            <Input placeholder="Email" readOnly={mailSent} />
                        </Form.Item>
                    

                        {errorMessage && <Alert message={errorMessage} type="error" />}
                        {!mailSent ?
                            <LoginButton type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
                            </LoginButton> : null
                        }
                    </Form>
                    {!mailSent ? <SubTitle1>
                        New on our platform? <a href="/signup">Create Account</a>
                    </SubTitle1>
                        : <SubTitle1>
                            Login to an Account <a href="/login">Log In</a>
                            <br />
                            Reset link button will be available in {countdown} second
                            {countdown !== 1 ? "s" : ""}
                        </SubTitle1>
                    }
                </>



                }
            </LoginFormContainer>
            <Container />
        </LoginPageWrap>
    );
};

export default ForgotPasswordPage;
