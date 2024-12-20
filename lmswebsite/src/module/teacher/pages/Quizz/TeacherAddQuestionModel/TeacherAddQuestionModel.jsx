// src/components/QuizModel/TeacherAddQuestionModel.jsx

import React, { useState } from "react";
import {
  Container,
  QuestionContainer,
  Textarea,
  OptionsContainer,
  OptionRow,
  // Input,
  CorrectOptionSelect,
  ButtonContainer,
  AddButton,
  ApplyButton,
  QuestionInput,
} from "./TeacherAddQuestionModel.style";
import { Form, Input, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Animation from "../../../../teacher/assets/Animation.json";
import Lottie from "lottie-react";
const { Option } = Select;

const TeacherAddQuestionModel = ({ onSave }) => {

  const [form] = Form.useForm();
  form.resetFields();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionNumber: 1,
      questionText: "",
      options: { a: "", b: "", c: "", d: "" },
      correctOption: "",
    },
  ]);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      questionNumber: questions.length + 1,
      questionText: "",
      options: { a: "", b: "", c: "", d: "" },
      correctOption: "",
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleApply = (values) => {
    const { questions } = values;

    // Ensure there is at least one question
    if (!questions || questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    // Transform questions to the desired format
    const transformedQuestions = questions.map((q, index) => ({
      question_number: index + 1,
      question_text: q.questionText,
      options: [
        { option_id: 1, option_text: q.options.a },
        { option_id: 2, option_text: q.options.b },
        { option_id: 3, option_text: q.options.c },
        { option_id: 4, option_text: q.options.d },
      ],
      correct_option_id: { a: 1, b: 2, c: 3, d: 4 }[q.correctOption],
    }));

    // Pass the transformed questions to the parent component
    if (onSave) {
      onSave(transformedQuestions);
    }
    form.resetFields(); 
  };


  const handleQuestionTextChange = (e, id) => {
    const { value } = e.target;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, questionText: value } : question
      )
    );
  };

  const handleOptionChange = (e, id, option) => {
    const { value } = e.target;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, options: { ...question.options, [option]: value } }
          : question
      )
    );
  };

  const handleCorrectOptionChange = (e, id) => {
    const { value } = e.target;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, correctOption: value } : question
      )
    );
  };

  return (

    <>
      {/* <Container> */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleApply}
        initialValues={{
          questions: [
            {
              questionText: "",
              options: { a: "", b: "", c: "", d: "" },
              correctOption: "",
            },
          ],
        }}
      >
        <h4>Assessment Questions</h4>

        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    border: '1px solid #ccc',
                    padding: '1em',
                    marginBottom: '1em',
                    borderRadius: '5px',
                  }}
                >
                  {/* Question Text */}
                  <Form.Item
                    {...restField}
                    name={[name, 'questionText']}
                    label="Question Text"
                    rules={[{ required: true, message: 'Please enter the question text' }]}
                  >
                    <Input placeholder="Enter question text" />
                  </Form.Item>

                  {/* Options */}
                  <div style={{ marginBottom: '1em' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'options', 'a']}
                      label="Option A"
                      rules={[{ required: true, message: 'Please enter option A' }]}
                    >
                      <Input placeholder="Enter option A" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'options', 'b']}
                      label="Option B"
                      rules={[{ required: true, message: 'Please enter option B' }]}
                    >
                      <Input placeholder="Enter option B" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'options', 'c']}
                      label="Option C"
                      rules={[{ required: true, message: 'Please enter option C' }]}
                    >
                      <Input placeholder="Enter option C" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'options', 'd']}
                      label="Option D"
                      rules={[{ required: true, message: 'Please enter option D' }]}
                    >
                      <Input placeholder="Enter option D" />
                    </Form.Item>
                  </div>

                  {/* Correct Option Select */}
                  <Form.Item
                    {...restField}
                    name={[name, 'correctOption']}
                    label="Select Correct Option"
                    rules={[{ required: true, message: 'Please select the correct option' }]}
                  >
                    <Select placeholder="--Select--">
                      <Option value="a">A</Option>
                      <Option value="b">B</Option>
                      <Option value="c">C</Option>
                      <Option value="d">D</Option>
                    </Select>
                  </Form.Item>

                  <Button type="link" danger onClick={() => remove(name)}>
                    Remove Question
                  </Button>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                style={{ marginTop: '10px' }}
              >
                Add Question
              </Button>
            </>
          )}
        </Form.List>

        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: '#ff0080', borderColor: '#ff0080',width:"100%" ,marginTop:"10px"}}
        >
          Apply
        </Button>
      </Form>

    </>
  );
};

export default TeacherAddQuestionModel;
