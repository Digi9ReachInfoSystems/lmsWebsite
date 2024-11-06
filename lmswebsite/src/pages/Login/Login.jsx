// src/components/Login/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth
import { auth } from "../../config/firebaseConfig"; // Firebase instance
import { getUserByAuthId } from "../../api/userApi"; // Axios service for user profile
import bgImg from "../../assets/image 32.png";
import { refreshAccessToken } from "../../api/tempApi";
import { LoginPageWrap } from "./Login.styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Authenticate the user using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      console.log("User signed in:", user);
      localStorage.setItem(
        "sessionData",
        JSON.stringify({ accessToken: user.accessToken })
      );

      console.log(JSON.parse(localStorage.getItem("sessionData")));

      // Retrieve user profile using the returned authId (user.uid)
      const profileData = await getUserByAuthId(user.uid);
      // const aT = await refreshAccessToken(profileData.user.refresh_token);
      // Store relevant information in session storage

      const sessionData = {
        userId: user.uid,
        accessToken: user.accessToken,
        refreshToken: profileData.user.refresh_token,
        name: profileData.user.name,
        loggedIn: "true",
      };
      // sessionStorage.clear();

      localStorage.setItem("sessionData", JSON.stringify(sessionData));

      // Update session with the latest access token
      // const newAccessToken = await refreshAccessToken(sessionStorage.getItem('refreshToken'));
      // const updatedSessionData = { ...sessionData, accessToken: profileData.accessToken };
      // sessionStorage.setItem('sessionData', JSON.stringify(updatedSessionData));

      // Navigate to the admin dashboard
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Incorrect email or password. Please try again.");
    }
  };

  return (
    <LoginPageWrap>
      <div className="login-container">
        <div className="login-image">
          <img src={bgImg} alt="The Topper Academy - Unlock Your Future!" />
        </div>
        <div className="login-page-form-main-container">
          <h2>Sign In</h2>
          <p>Enter your email and password to sign in!</p>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email*</label>
              <input
                type="email"
                placeholder="mail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password*</label>
              <div className="password-input">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="options">
              <a href="/">Forget password?</a>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <p>
            Not registered yet? <a href="/">Create an Account</a>
          </p>
        </div>
      </div>
    </LoginPageWrap>
  );
};

export default Login;
