// src/components/QuizModel/QuizList.jsx

import React, { useEffect, useState } from "react";
import {
  ViewButton,
  StyledButton,
  QuizCard,
  QuizzesContainer,
  QuizListWrap,
} from "./QuizList.Styles";

import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getUserByAuthId } from "../../../../../api/userApi";
import { getTeacherByAuthId } from "../../../../../api/teacherApi";
import { getQuizzesByTeacher, createQuiz } from "../../../../../api/quizApi";
import TeacherCreateQuizForm from "../TeacherCreateQuizForm/TeacherCreateQuizForm";
import {
  BodyText,
  Heading,
  PageContainer,
  PrimaryButton,
  ModalBody,
} from "../../../../../style/PrimaryStyles/PrimaryStyles";
import {
  Table,
  Button,
  Input,
  Modal,
  Image,
  message,
  Spin,
  Collapse,
  Typography,
  List,
  Divider,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SubHeading } from "../../../../../components/common/landingPageComponents/SingleCoursePerClass.styles";
import Animation from "../../../../teacher/assets/Animation.json";
import Lottie from "lottie-react";

const { Panel } = Collapse;
const { Title, Text } = Typography;

export default function QuizList() {
  const [searchInput, setSearchInput] = useState("");
  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
  const [quizzes, setQuizzes] = useState([]); // State to store quizzes
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error messages
  const [success, setSuccess] = useState(null); // State for success messages
  const [teacherId, setTeacherId] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const navigate = useNavigate();

  const [selectedQuiz, setSelectedQuiz] = useState(null); // Store selected quiz for modal
  const [quizResponse, setQuizResponse] = useState(null); // Store quiz responses
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [antTableData, setAntTableData] = useState([]);
  const [model2, setModel2] = useState(false);
  const [model3, setModel3] = useState(false);

  const param = useParams();
  const batchId = param.batchId;

  useEffect(() => {
    const apicaller = async () => {
      setLoading(true);
      try {
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          message.error("User session not found. Please log in again.");
          navigate("/login"); // Redirect to login if session data is missing
          return;
        }

        const authId = sessionData.userId;
        const teacherData = await getTeacherByAuthId(authId);
        console.log("Teacher Data:", teacherData);

        if (!teacherData || !teacherData.teacher || !teacherData.teacher._id) {
          message.error("Teacher data not found.");
          return;
        }

        const data = await getQuizzesByTeacher({
          teacher_id: teacherData.teacher._id,
          batch_id: batchId,
        });
        console.log("Quizzes Data:", data);

        if (data && data.quizzes) {
          setQuizzes(data.quizzes);
          setOriginalData(data.quizzes);
          setFilterData(data.quizzes);
          setTeacherId(teacherData.teacher._id);
        } else {
          message.warning("No quizzes found for this batch.");
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to fetch quizzes. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    apicaller();
  }, [batchId, navigate]);

  // Handle showing the dialog
  const handleAddQuiz = () => {
    setShowDialog(true); // Show dialog when the button is clicked
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setShowDialog(false); // Hide dialog when close is clicked
  };

  const handleUploadAssessment = () => {
    navigate("/teacher/dashboard/quizz/assignedBatch/uploadContent");
  };

  // Handle form submission (onSubmit function)
  const handleFormSubmit = async (formData) => {
    console.log("Form submitted with data: ", formData);

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await createQuiz(formData);
      if (response && response.quiz) {
        setQuizzes((prevQuizzes) => [...prevQuizzes, response.quiz]);
        setOriginalData((prevQuizzes) => [...prevQuizzes, response.quiz]);
        setFilterData((prevQuizzes) => [...prevQuizzes, response.quiz]);
        setShowDialog(false); // Close the form dialog after submission
        setSuccess("Quiz created successfully!");
        message.success("Quiz created successfully!");
      } else {
        setError("Failed to create quiz. Please try again.");
        message.error("Failed to create quiz. Please try again.");
      }
    } catch (err) {
      console.error("Error creating quiz:", err.response || err.message);
      setError("An error occurred while creating the quiz.");
      message.error("An error occurred while creating the quiz.");
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on searchInput for "Quiz Name"
  useEffect(() => {
    if (searchInput) {
      const filtered = originalData.filter((item) =>
        item.quiz_title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilterData(filtered);
    } else {
      setFilterData(originalData); // Reset to original data if search is empty
    }
    console.log("Filtered Data:", filterData);
  }, [searchInput, originalData]);

  const handleViewQuestions = (quiz) => {
    setSelectedQuiz(quiz); // Set selected quiz to show its questions in modal
  };

  const handleViewResponses = (quiz) => {
    setQuizResponse(quiz.answered_by || []); // Assuming responses are inside the quiz object
    const tableData = (quiz.answered_by || []).map((item) => {
      return {
        _id: item._id,
        student_name: item.student_id?.user_id?.name || "Unknown",
        score: item.score,
      };
    });
    setAntTableData(tableData);
    setLoadingResponses(false);
    setModel2(true);
  };


  const handleBackPage =() =>{
    navigate(-1);
  }

  
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => <BodyText>{index + 1}</BodyText>,
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
      render: (text) => <BodyText>{text}</BodyText>,
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (text) => <BodyText>{text}</BodyText>,
    },
  ];

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
          <Lottie animationData={Animation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <>
      <QuizListWrap>
        <div className="created-quizes-batches-row-one">
          <div className="created-quizes-batches-title-section">
            {/* <Link to={`/teacher/dashboard/quizz/assignedBatch`}>
              <IoMdArrowRoundBack size={24} />
            </Link> */}
            <Heading style={{display:"flex", justifyContent:"center",alignItems:"center"}}>  <IoArrowBackOutline style={{fontSize: "24px", marginRight:"8px", color:"black", }} onClick={handleBackPage} /> Created Assessment</Heading>
          </div>
          <div className="created-quizes-batches-action-section">
            <Input
              placeholder="Search by Assessment Name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              allowClear
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />

            <PrimaryButton onClick={handleAddQuiz}>
              <AiOutlineFileAdd size={24} />
              Create Assignment
            </PrimaryButton>

            <PrimaryButton onClick={handleUploadAssessment}>
              <AiOutlineFileAdd size={24} />
              Upload Homework
            </PrimaryButton>
          </div>
        </div>
        <div className="area-row ar-two"></div>
        <div className="area-row ar-three">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <QuizzesContainer>
            {filterData.map((quiz, index) => (
              <QuizCard key={quiz._id || index}>
                <h2>{quiz.quiz_title}</h2>

                <div className="batch">
                  <p className="red">
                    <strong>Batch:</strong> {quiz.batch_index?.batch_name || "N/A"}
                  </p>
                </div>

                <div className="quizdisplay">
                  <div className="subject">
                    <p>
                      <strong>Subject:</strong> {quiz.subject?.subject_name || "N/A"}
                    </p>
                  </div>

                  <div className="class">
                    <p>
                      <strong>Class :</strong> {quiz.class_level?.classLevel || "N/A"}
                    </p>
                  </div>

                  <div className="description">
                    <p>
                      <strong>Description:</strong> {quiz.description || "No description provided."}
                    </p>
                  </div>
                </div>

                <div className="view-questions-button">
                  <StyledButton onClick={() => handleViewQuestions(quiz)}>
                    View Questions
                  </StyledButton>

                  <StyledButton onClick={() => handleViewResponses(quiz)}>
                    View Responses
                  </StyledButton>
                </div>
              </QuizCard>
            ))}
          </QuizzesContainer>

          {/* Create Quiz Modal */}
          <Modal
            title={`Create New Assessment`}
            open={showDialog}
            onCancel={handleCloseDialog}
            footer={null}
          >
            <ModalBody>
              <TeacherCreateQuizForm
                onSubmit={handleFormSubmit} // Pass the onSubmit function
                onClose={handleCloseDialog} // Pass onClose for closing the dialog
                teacherId={teacherId} // Pass the teacherId
              />
            </ModalBody>
          </Modal>

          {/* View Questions Modal */}
          <Modal
            title={<SubHeading>{selectedQuiz?.quiz_title}</SubHeading>}
            open={!!selectedQuiz}
            onCancel={() => setSelectedQuiz(null)}
            footer={null}
            width={800} // Adjust the width as needed
            centered
            bodyStyle={{ padding: "20px" }}
          >
            <ModalBody>
              {selectedQuiz?.questions.length > 0 ? (
                <Collapse accordion>
                  {selectedQuiz.questions.map((question, index) => (
                    <Panel
                      header={
                        <Title level={5}>
                          <BodyText>{`Q${index + 1}: ${question.question_text}`}</BodyText>
                        </Title>
                      }
                      key={question._id || index} // Use unique identifier if available
                    >
                      {/* Display Image if available */}
                      {question.image && (
                        <div style={{ marginBottom: "15px" }}>
                          <Image
                            src={question.image}
                            alt={`Question ${index + 1} Image`}
                            width={200}
                            height={200}
                            style={{ objectFit: "cover" }}
                            placeholder={
                              <Spin />
                            }
                          />
                        </div>
                      )}

                      {/* Display Options */}
                      <List
                        dataSource={question.options}
                        renderItem={(option) => (
                          <List.Item key={option.option_id}>
                            <Text>
                              <BodyText>
                                <strong>{option.option_id}.</strong> {option.option_text}
                              </BodyText>
                            </Text>
                          </List.Item>
                        )}
                      />
                    </Panel>
                  ))}
                </Collapse>
              ) : (
                <Text>No questions available for this quiz.</Text>
              )}
            </ModalBody>
          </Modal>

          {/* View Responses Modal */}
          <Modal
            title={`Responses`}
            open={model2}
            onCancel={() => {
              setSelectedQuiz(null);
              setModel2(false);
            }}
            footer={null}
          >
            {loadingResponses ? (
              <Spin tip="Loading..." />
            ) : (
              <div>
                {quizResponse && quizResponse.length === 0 ? (
                  <BodyText>No answers submitted by students yet!</BodyText>
                ) : (
                  <Table
                    columns={columns}
                    dataSource={antTableData} // Bind the filtered data to the table
                    rowKey="_id"
                    pagination={true} // You can add pagination if needed
                  />
                )}
              </div>
            )}
          </Modal>
        </div>
      </QuizListWrap>
    </>
  );
}
