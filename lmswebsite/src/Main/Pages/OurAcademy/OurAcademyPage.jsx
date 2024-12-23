// import React from 'react'
// import HeaderSection from '../NavBar/navbar';
// import { Box, Typography, Button } from "@mui/material";
// import StatsCard from "../HeroContent/Statscard";
// import GroupIcon from "@mui/icons-material/Groups";



// function OurAcademyPage() {
//   return (
//     <div>
//         <HeaderSection/>
//         <div>
//         <Box
//       sx={{
//         position: "relative",
//         minHeight: "100vh",
//         background: "linear-gradient(270deg, #fff 0%, #fdf2f8 100%)",
//         // overflow: "hidden",
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//         alignItems: "flex-start",
//         justifyContent: "space-between",
//         padding: { xs: "2rem 1rem", md: "4rem 2rem" },
//         zIndex: 1,
//         "::before": {
//           content: '""',
//           position: "absolute",
//           top: "10%",
//           left: "15%",
//           width: "200px",
//           height: "200px",
//           background: "rgba(106, 17, 203, 0.5)",
//           filter: "blur(100px)",
//           borderRadius: "50%",
//           zIndex: 0,
//         },
//         "::after": {
//           content: '""',
//           position: "absolute",
//           bottom: "20%",
//           right: "10%",
//           width: "300px",
//           height: "300px",
//           background: "rgba(255, 182, 119, 0.9)",
//           filter: "blur(150px)",
//           borderRadius: "50%",
//           zIndex: 0,
//         },
//       }}
//     >
//       {/* SVG Background Curve */}
//       <Box
//         component="div"
//         sx={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           width: "100%",
//           lineHeight: 0,
//           zIndex: 0,
//         }}
//       >
//         <svg
//           viewBox="0 0 1440 320"
//           preserveAspectRatio="none"
//           style={{ width: "100%", height: "100%", display: "block" }}
//         >
//           <path
//             fill="#fff"
//             d="M0,256L80,229.3C160,203,320,149,480,160C640,171,800,245,960,240C1120,235,1280,149,1360,106.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
//           ></path>
//         </svg>
//       </Box>

//       {/* Floating Bubbles */}
//       {[1, 2, 3, 4].map((_, index) => (
//         <Box
//           key={index}
//           sx={{
//             position: "absolute",
//             width: `${40 + index * 10}px`,
//             height: `${40 + index * 10}px`,
//             borderRadius: "50%",
//             backgroundColor: ["#26D07C", "#FFB677", "#9EA8FF", "#00C897"][
//               index
//             ],
//             top: `${10 + index * 20}%`,
//             left: index % 6 === 0 ? `${10 + index * 5}%` : "auto",
//             right: index % 2 !== 0 ? `${5 + index * 5}%` : "auto",
//             animation: `floatAnimation ${4 + index}s infinite ease-in-out`,
//             boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
//             zIndex: 0,
//           }}
//         />
//       ))}

//       {/* Left Content */}
//       <Box
//         sx={{
//           flex: "1",
//           textAlign: { xs: "center", md: "left" },
//           zIndex: 2,
//           paddingLeft: { xs: 0, md: "10vw" },
//           paddingTop: { xs: "4rem", md: "8rem" },
//         }}
//       >
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: "bold",
//             fontSize: { xs: "2rem", md: "3rem" },
//             marginBottom: "1rem",
//             fontFamily: "Nunito, sans-serif",
//             color: "#333",
//           }}
//         >
//           {/* Best Platform For Online <br />
//           Learning */}
//           Achieve more with expert online coaching
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             fontSize: { xs: "1rem", md: "1.2rem" },
//             color: "#6c757d",
//             fontFamily: "Nunito, sans-serif",
//             marginBottom: "2rem",
//           }}
//         >
//           Step up. Learn. Achieve
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             gap: "1rem",
//             justifyContent: { xs: "center", md: "flex-start" },
//           }}
//         >
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: "#6A11CB", color: "#fff" }}
//             onClick={() => navigate("/selectBoard")}
//           >
//             Enroll as a Student
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={() => navigate("/teacher")}
//             sx={{ borderColor: "#6A11CB", color: "#6A11CB" }}
//           >
//             Become a Teacher
//           </Button>
//         </Box>

//         {/* Stats Cards (Hide on mobile) */}
//         <StatsCard
//           title="Total Students"
//           value="15K"
//           icon={<GroupIcon sx={{ color: "#fff" }} />}
//           bgColor="#6A11CB"
//           position={{
//             top: "8%",
//             left: "25%",
//             "@media(max-width:576px)": { top: "50%" },
//           }}
//           sx={{
//             display: { xs: "none", md: "block" },
//           }}
//         />
//         <StatsCard
//           title="Active Mentors"
//           value="500+"
//           icon={<GroupIcon sx={{ color: "#fff" }} />}
//           bgColor="#00C897"
//           position={{
//             top: "40%",
//             right: "5%",
//             "@media(max-width:576px)": { top: "46%" },
//           }}
//           sx={{
//             display: { xs: "none", md: "block" },
//           }}
//         />
//         <StatsCard
//           title="Total Classes"
//           value="8K+"
//           icon={<GroupIcon sx={{ color: "#fff" }} />}
//           bgColor="#FFB677"
//           position={{ bottom: "35%", left: "15%" }}
//           sx={{
//             display: { xs: "none", md: "block" },
//           }}
//         />
//         <StatsCard
//           title="Subjects Offered"
//           value="100+"
//           icon={<GroupIcon sx={{ color: "#fff" }} />}
//           bgColor="#FF4081"
//           position={{ bottom: "20%", right: "35%" }}
//           sx={{
//             display: { xs: "none", md: "block" },
//           }}
//         />
//       </Box>

//       {/* Right Mockup */}
//       <Box
//         sx={{
//           flex: "1",
//           position: "relative",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 2,
//           marginTop: { xs: "2rem", md: 0 },
//         }}
//       >
//         <img
//           src="https://static.vecteezy.com/system/resources/previews/000/457/141/original/landing-page-template-of-website-design-illustration-concept-isometric-flat-design-concept-of-web-page-design-for-website-and-mobile-website-vector-illustration.jpg"
//           alt="Mockup"
//           style={{
//             width: "90%",
//             maxWidth: "700px",
//             borderRadius: "12px",
//             boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
//           }}
//         />
//       </Box>
//     </Box>
//         </div>
      
//     </div>
//   )
// }

// export default OurAcademyPage;
















import React from "react";
import "./OurAcademy.css";
import OurAcademylogo from "../../../../src/Main/assets/OurAcadamylogo.svg";
import HeaderSection from '../NavBar/navbar';

const OurAcademyPage = () => {
  return (
    <div>
                <HeaderSection/>
    <section className="academy-hero-section">
        <div>
            <img src={OurAcademylogo} alt="" />
        </div>
      <div className="academy-content">
        <h1 className="academy-title">
        The Topper Academy:{" "}
          <span className="academy-highlight">Unlock Your Future!</span> </h1>
          <div style={{display:"flex"}}>
          <span className="academy-line"></span>
        <p className="academy-description">
          
          In today’s fast-paced, technology-driven world, the landscape of education and personal development has evolved dramatically. One of the most transformative trends in recent years is the rise of Online Coaching Academies, which offer learners a flexible, accessible, and often more personalized way to acquire new skills, knowledge, or certifications. These academies bridge the gap between traditional educational institutions and modern-day learners who seek self-paced, expert-led guidance without the constraints of location or rigid schedules.
        </p>
        </div>
      </div>
    </section>












































    <div style={{display:"flex",flexDirection:"row",alignItems:"center", background:"#fff", padding:"20px"}}>


    <section className="academy-hero-section2">
      <div className="academy-content">
        <h1 className="academy-title">
        What is The Topper Academy?{" "}
        </h1>
          <div style={{display:"flex"}}>
        <p className="academy-description">
          
        <strong>The Topper Academy </strong> is a virtual learning platform that provides coaching and mentorship in a variety of levels, ranging from school level, competitive level and Job level. The Topper Academy typically feature interactive courses, one-on-one sessions, group coaching, and a mix of live and on-demand content. The focus is not just on imparting knowledge, but also on providing tailored coaching that helps learners achieve their personal or professional goals.
        </p>
        </div>
      </div>
    </section>



    <section className="academy-hero-section3">
      <div className="academy-content">
        <h1 className="academy-title">
        Benefits of Joining The Topper Academy{" "}
        </h1>
          <div >

<ul  style={{listStyleType:"number"}}>
     <li><strong>	Access to Expertise:</strong> With The Topper Academy, learners can connect with top coaches or mentors regardless of geographical barriers. This allows access to high-quality expertise that might not be available locally.</li>
<li> <strong>	 	Cost-Effectiveness:   </strong>Compared to traditional education or in-person coaching, our platform will provide more affordable options. Learners can choose from a variety of packages depending on their budget, and the costs may be lower due to reduced overheads and logistical expenses.</li>         
<li> <strong>		Convenience: </strong>Online coaching academies eliminate the need for commuting, providing a seamless learning experience from the comfort of your home. With mobile-friendly platforms, students can even learn on-the-go.</li>

</ul>
        
        </div>
      </div>
    </section>

    </div>



    <section className="academy-hero-section4">
      <div className="academy-content">
        <h1 className="academy-title">
        Key Features of The Topper Academy{" "}
        </h1>
          <div >

<ul  style={{listStyleType:"number"}}>
     <li><strong>	Expert-Led Learning: </strong> Our Academy often employ industry experts, seasoned coaches, or professionals with significant experience in their respective fields. This allows learners to gain insights from those who have real-world expertise and practical experience.</li>
<li> <strong>	Flexibility:  </strong> One of the biggest advantages of our academy is the flexibility it offers. Learners can access lessons, resources, and coaching sessions from anywhere in the world, at any time that suits their schedules. This is especially beneficial for students, working professionals, entrepreneurs, or anyone with a busy lifestyle.</li>         
<li> <strong>	Personalized Coaching: </strong> Unlike traditional classroom settings where the approach tends to be one-size-fits-all, The Topper Academy allows for personalized coaching plans. Coaches tailor their advice and sessions to meet the specific needs, strengths, and challenges of each individual.</li>
<li> <strong>Interactive Learning Materials: </strong> The Topper Academy often combine multimedia tools such as video lessons, webinars, interactive quizzes, assignments, and peer discussions to enhance engagement and retention. We also offer downloadable resources, templates, and worksheets that provide practical value.</li>
<li> <strong>Accountability and Support:  </strong>Coaching goes beyond mere teaching. The personal connection between coach and learner fosters accountability. Learners receive ongoing support, feedback, and motivation, which helps them stay on track toward their goals. This feature is particularly beneficial for those pursuing long-term objectives like career advancement, weight loss, or personal growth.</li>
<li> <strong>Community Engagement: </strong> Our online coaching platform foster a sense of community by offering discussion forums, networking opportunities, and group coaching sessions. This collaborative environment helps learners share experiences, gain insights from peers, and build a supportive network.</li>
</ul>
        
        </div>
      </div>
    </section>





























    </div>
  );
};

export default OurAcademyPage;
