import React, { useEffect, useState } from "react";
import { Card, Typography, Spin, Alert, Progress } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getStudentByAuthId } from "../../../../api/studentApi";
import { getBatchesByStudentId } from "../../../../api/batchApi";
import { getQuizByBatchId } from "../../../../api/quizApi";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const QuizScore = () => {
  const [studentId, setStudentId] = useState(null);
  const [pendingQuizzes, setPendingQuizzes] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Fetch student data from localStorage
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData?.userId) {
          throw new Error("User is not authenticated.");
        }

        const authId = sessionData.userId;
        const studentData = await getStudentByAuthId(authId);
        const currentStudentId = studentData?.student?._id;

        if (!currentStudentId) {
          throw new Error("Student data is incomplete.");
        }

        setStudentId(currentStudentId);

        // Fetch batches associated with the student
        const fetchedBatches = await getBatchesByStudentId(currentStudentId);
        const batchIds = fetchedBatches.map((batch) => batch._id);

        // Fetch quizzes for each batch
        const quizzesData = await Promise.all(
          batchIds.map((batchId) => getQuizByBatchId(batchId))
        );

        // Aggregate quizzes
        const allQuizzes = quizzesData.flatMap((batch) => batch.quizzes || []);
        const total = allQuizzes.length;

        // Determine answered and pending quizzes
        const answered = allQuizzes.filter((quiz) =>
          quiz.answered_by?.some((answer) => answer.student_id === currentStudentId)
        ).length;

        const pending = total - answered;
        const completionPercentage = total > 0 ? (answered / total) * 100 : 0;

        setAnsweredCount(answered);
        setTotalQuizzes(total);
        setPendingQuizzes(pending);
        setPercentage(Math.round(completionPercentage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

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
        <Spin size="large" />
      </div>
    );
  }

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
    <Link to="/student/dashboard/taskBoard">
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
            Pending Assessment
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
        <Text type="secondary" style={{ paddingLeft: "10px" }}>
          Assessment remaining
        </Text>

        <br />
        <Text>
          Answered: {answeredCount} / {totalQuizzes}
        </Text>
      </Card>
    </Link>
  );
};

export default QuizScore;
