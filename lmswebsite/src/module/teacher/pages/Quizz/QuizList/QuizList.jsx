import React, { useEffect, useState } from "react";

import {
  ViewButton,
  StyledButton,
  QuizCard,
  QuizzesContainer,
  QuizListWrap,
} from "./QuizList.Styles";
import { Link, useParams } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getUserByAuthId } from "../../../../../api/userApi";
import { getTeacherByAuthId } from "../../../../../api/teacherApi";
import { getQuizzesByTeacher } from "../../../../../api/quizApi";
import TeacherCreateQuizForm from "../TeacherCreateQuizForm/TeacherCreateQuizForm";
import { createQuiz } from "../../../../../api/quizApi";
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
      const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const teacherData = await getTeacherByAuthId(authId);
      console.log("Teacher Data:", teacherData);
      const data = await getQuizzesByTeacher({
        teacher_id: teacherData.teacher._id,
        batch_id: batchId,
      });
      console.log("Teacher ID:", data);
      setQuizzes(data.quizzes);
      setOriginalData(data.quizzes);
      setFilterData(data.quizzes);
      setTeacherId(teacherData.teacher._id);
    };
    apicaller();
  }, [batchId]);

  // Handle showing the dialog
  const handleAddQuiz = () => {
    setShowDialog(true); // Show dialog when the button is clicked
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setShowDialog(false); // Hide dialog when close is clicked
  };

  // Handle form submission (onSubmit function)
  const handleFormSubmit = async (formData) => {
    console.log("Form submitted with data: ", formData);

    setLoading(true);
    setError(null);
    setSuccess(null);

    // Prepare the data according to the backend requirements
    const responseData = {
      quiz_title: formData.title,
      teacher_id: teacherId, // Use the passed teacherId
      batch_index: formData.batch,
      class_level: formData.classLevel,
      subject: formData.subject,
      description: formData.description,
      // dueDate: formData.dueDate, // Uncomment if using dueDate
      questions: formData.questions.map((q, index) => ({
        question_number: index + 1,
        question_text: q.questionText,
        options: [
          { option_id: 1, option_text: q.options.a },
          { option_id: 2, option_text: q.options.b },
          { option_id: 3, option_text: q.options.c },
          { option_id: 4, option_text: q.options.d },
        ],
        correct_option_id: parseInt(q.correctOption, 10),
        is_answer_valid: true, // Assuming validation is done
      })),
    };
    try {
      const response = await createQuiz(formData);
      if (response && response.quiz) {
        // setQuizzes((prevQuizzes) => [...prevQuizzes, response.quiz]);
        setShowDialog(false); // Close the form dialog after submission
        setSuccess("Quiz created successfully!");
        setTimeout(() => setSuccess(null), 3000); // Clear success message after 3 seconds
      } else {
        setError("Failed to create quiz. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while creating the quiz.");
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
    console.log("filtered Data", filterData);
  }, [searchInput, originalData]);

  const handleViewQuestions = (quiz) => {
    setSelectedQuiz(quiz); // Set selected quiz to show its questions in modal'
  };

  const handleViewResponses = (quiz) => {
    setQuizResponse(quiz.answered_by || []); // Assuming responses are inside the quiz object
    const filterData = quiz.answered_by.map((item) => {
      return {
        _id: item._id,
        student_name: item.student_id.user_id.name,
        score: item.score,
      };
    });
    setAntTableData(filterData);
    setLoadingResponses(false);
    setModel2(true);
  };

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

  return (
    <>
      <QuizListWrap>
        <div className="created-quizes-batches-row-one">
          <div className="created-quizes-batches-title-section">
            <Link to={`/teacher/dashboard/quizz/assignedBatch`}>
              <IoMdArrowRoundBack size={24} />
            </Link>
            <Heading>Created Quizes</Heading>
          </div>
          <div className="created-quizes-batches-action-section">
            <Input
              placeholder="Search by Circular Name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              allowClear
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
            <PrimaryButton
              onClick={handleAddQuiz} // Open modal on click
            >
              <AiOutlineFileAdd size={24} />
              Create Quizes
            </PrimaryButton>
          </div>
        </div>
        <div className="area-row ar-two"></div>
        <div className="area-row ar-three">
          {loading && <p>Creating quiz...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <QuizzesContainer>
            {filterData.map((quiz, index) => (
              <QuizCard key={quiz._id || index}>
                <h2>{quiz.quiz_title}</h2>

                <div className="batch">
                  <p className="red">
                    <strong>Batch:</strong> {quiz.batch_index.batch_name}{" "}
                    {/* Assuming populated */}
                  </p>
                </div>

                <div className="quizdisplay">
                  <div className="subject">
                    <p>
                      <strong>Subject:</strong> {quiz.subject?.subject_name}{" "}
                      {/* Assuming populated */}
                    </p>
                  </div>

                  <div className="class">
                    <p>
                      <strong>Class :</strong> {quiz.class_level?.classLevel}{" "}
                      {/* Assumig populated */}
                    </p>
                  </div>

                  <div className="description">
                    <p>
                      <strong>Description:</strong> {quiz.description}
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
          {
            <Modal
              title={`Create New Quiz`}
              open={showDialog}
              onCancel={() => {
                setShowDialog(false);
              }}
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
          }
          {/* Conditionally render the TeacherCreateQuizForm dialog */}
          {/* {showDialog==undefined && (
                        <TeacherCreateQuizForm
                            onSubmit={handleFormSubmit} // Pass the onSubmit function
                            onClose={handleCloseDialog} // Pass onClose for closing the dialog
                            teacherId={teacherId} // Pass the teacherId
                        />
                    )} */}
          <Modal
            title={<SubHeading>{selectedQuiz?.quiz_title}</SubHeading>} // Use the selectedQuiz?.quiz_title}
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
                          <BodyText>{`Q${index + 1}: ${
                            question.question_text
                          }`}</BodyText>
                        </Title>
                      }
                      key={question._id || index} // Use unique identifier if available
                    >
                      <List
                        dataSource={question.options}
                        renderItem={(option) => (
                          <List.Item key={option.option_id}>
                            <Text>
                              <BodyText>
                                <strong>{option.option_id}.</strong>{" "}
                                {option.option_text}
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
                  <BodyText>No Answer's Submitted By Students Yet!</BodyText>
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
