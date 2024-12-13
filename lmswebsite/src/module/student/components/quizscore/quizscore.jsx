import React, { useEffect, useState } from "react";
import { Card, Typography, Spin, Alert, Progress } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getStudentByAuthId } from "../../../../api/studentApi";
import { getBatchesByStudentId } from "../../../../api/batchApi";
import { getQuizByBatchId, getQuizBySubjectId } from "../../../../api/quizApi";
// import  Animation from "../../../student/assets/Animation.json";
import Lottie from "lottie-react";

const { Title, Text } = Typography;

const QuizScore = () => {
  const [studentId, setStudentId] = useState(null);
  const [pendingQuizzes, setPendingQuizzes] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [percentage, setPercentage] = useState(0);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        // Fetching student data from localStorage
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          console.error("User is not authenticated.");
          throw new Error("User is not authenticated.");
        }

        const authId = sessionData.userId;
        const studentData = await getStudentByAuthId(authId);

        if (!studentData.student || !studentData.student._id) {
          console.error("Student data is incomplete.");
          throw new Error("Student data is incomplete.");
        }

        const currentStudentId = studentData.student._id;
        setStudentId(currentStudentId);

        // Fetch batches based on student ID
        const fetchedBatches = await getBatchesByStudentId(currentStudentId);

        // Extract unique subject IDs from the batches
        // const subjectIds = fetchedBatches.map((batch) => batch.subject_id._id);
        // const uniqueSubjectIds = [...new Set(subjectIds)];

        // Fetch unique batch IDs from the batches
        const batchIds = fetchedBatches.map((batch) => batch._id);
        const uniqueBatchIds = [...new Set(batchIds)];

        // Fetch quizzes for each unique batch ID
        const quizzesData = await Promise.all(
          uniqueBatchIds.map((batchId) => getQuizByBatchId(batchId))
        );
        // Fetch quizzes for each unique subject ID
        // const quizzesData = await Promise.all(
        //   uniqueSubjectIds.map((subjectId) => getQuizBySubjectId(subjectId))
        // );

        // For simplicity, this example assumes data from quizzesData[0], 
        // but ideally you would aggregate all quizzes from all subjects.
        const allQuizzes = quizzesData[0]?.quizzes || [];

        let answered = 0;
        let total = allQuizzes.length;

        // Count how many quizzes have been answered by this student
        allQuizzes.forEach((quiz) => {
          const isAnswered = quiz.answered_by?.some(
            (answer) => answer.student_id === currentStudentId
          );
          if (isAnswered) answered++;
        });

        const pending = total - answered;

        // Calculate percentage of answered quizzes
        const completionPercentage = total > 0 ? (answered / total) * 100 : 0;

        setAnsweredCount(answered);
        setTotalQuizzes(total);
        setPendingQuizzes(pending);
        setPercentage(Math.round(completionPercentage));
        // setLoading(false);
      } catch (err) {
        setError(err.message);
        // setLoading(false);
      }
    };

    apiCaller();
  }, []);

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <div
  //         style={{
  //           width: "300px",
  //           height: "300px",
  //           overflow: "hidden",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           // Scale down the animation using transform
  //           transform: "scale(0.5)", 
  //           transformOrigin: "center center",
  //         }}
  //       >
  //         <Lottie
  //           animationData={Animation}
  //           loop={true}
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px" }}
      />
    );
  }

  return (
    <Card
      bordered={false}
      style={{
        width: 300,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <CheckCircleOutlined
          style={{ fontSize: 24, color: "#52c4dd", marginRight: 8 }}
        />
        <Title level={5} style={{ margin: 0 }}>
          Pending Quizzes
        </Title>
      </div>

      <Progress
        percent={percentage}
        status="active"
        strokeColor="#52c41a"
        style={{ marginBottom: 16 }}
      />

      <Text strong style={{ fontSize: "24px" }}>
        {pendingQuizzes}
      </Text>

      <Text type="secondary" style={{ paddingLeft: "10px" }}>Quizzes remaining</Text>

      <br />
      <Text>
        Answered: {answeredCount} / {totalQuizzes}
      </Text>
    </Card>
  );
};

export default QuizScore;
