// src/components/QuizModel/TeacherAddQuestionModel.jsx

import React, { useState } from "react";
import {
  Container,
  QuestionContainer,
  Textarea,
  OptionsContainer,
  OptionRow,
  CorrectOptionSelect,
  ButtonContainer,
  AddButton,
  ApplyButton,
  QuestionInput,
} from "./TeacherAddQuestionModel.style";
import { Form, Input, Select, Button, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Animation from "../../../../teacher/assets/Animation.json";
import Lottie from "lottie-react";
import { uploadFileToFirebase } from "../../../../../utils/uploadFileToFirebase"; // Adjust the path accordingly

const { Option } = Select;

const TeacherAddQuestionModel = ({ onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission.
   *
   * @param {Object} values - The form values.
   */
  const handleApply = async (values) => {
    const { questions } = values;

    // Ensure there is at least one question
    if (!questions || questions.length === 0) {
      message.error("Please add at least one question.");
      return;
    }

    setLoading(true); // Start loading indicator

    try {
      // Transform questions and upload images if present
      const transformedQuestions = await Promise.all(
        questions.map(async (q, index) => {
          let imageUrl = null;

          // Check for uploaded image and upload if present
          if (q.image && q.image.length > 0 && q.image[0].originFileObj) {
            try {
              imageUrl = await uploadFileToFirebase(
                q.image[0].originFileObj,
                `quiz_images/quiz_${Date.now()}`
              );
            } catch (error) {
              message.error(`Failed to upload image for question ${index + 1}`);
              console.error(error);
            }
          }

          return {
            question_number: index + 1,
            question_text: q.questionText,
            image: imageUrl, // Include image URL if uploaded, otherwise null
            options: [
              { option_id: 1, option_text: q.options.a },
              { option_id: 2, option_text: q.options.b },
              { option_id: 3, option_text: q.options.c },
              { option_id: 4, option_text: q.options.d },
            ],
            correct_option_id: { a: 1, b: 2, c: 3, d: 4 }[q.correctOption],
          };
        })
      );

      // Pass the transformed questions to the parent component or backend
      if (onSave) {
        await onSave(transformedQuestions); // Ensure onSave handles async operations
        message.success("Quiz created successfully!");
      }

      form.resetFields(); // Reset the form after successful submission
    } catch (error) {
      message.error("Failed to create quiz. Please try again.");
      console.error("Error creating quiz:", error);
    } finally {
      setLoading(false); // End loading indicator
    }
  };

  return (
    <>
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
              image: null,
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
                    border: "1px solid #ccc",
                    padding: "1em",
                    marginBottom: "1em",
                    borderRadius: "5px",
                  }}
                >
                  {/* Question Text */}
                  <Form.Item
                    {...restField}
                    name={[name, "questionText"]}
                    label="Question Text"
                    rules={[
                      { required: true, message: "Please enter the question text" },
                    ]}
                  >
                    <Input placeholder="Enter question text" />
                  </Form.Item>

                  {/* Image Upload */}
                  <Form.Item
                    {...restField}
                    name={[name, "image"]}
                    label="Upload Image (Optional)"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e && e.fileList.slice(-1); // Keep only the latest file
                    }}
                  >
                    <Upload
                      name="image"
                      listType="picture"
                      maxCount={1}
                      beforeUpload={() => false} // Prevent automatic upload
                      accept="image/*" // Accept only image files
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>

                  {/* Options */}
                  <div style={{ marginBottom: "1em" }}>
                    <Form.Item
                      {...restField}
                      name={[name, "options", "a"]}
                      label="Option A"
                      rules={[{ required: true, message: "Please enter option A" }]}
                    >
                      <Input placeholder="Enter option A" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "options", "b"]}
                      label="Option B"
                      rules={[{ required: true, message: "Please enter option B" }]}
                    >
                      <Input placeholder="Enter option B" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "options", "c"]}
                      label="Option C"
                      rules={[{ required: true, message: "Please enter option C" }]}
                    >
                      <Input placeholder="Enter option C" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "options", "d"]}
                      label="Option D"
                      rules={[{ required: true, message: "Please enter option D" }]}
                    >
                      <Input placeholder="Enter option D" />
                    </Form.Item>
                  </div>

                  {/* Correct Option Select */}
                  <Form.Item
                    {...restField}
                    name={[name, "correctOption"]}
                    label="Select Correct Option"
                    rules={[
                      {
                        required: true,
                        message: "Please select the correct option",
                      },
                    ]}
                  >
                    <Select placeholder="--Select--">
                      <Option value="a">A</Option>
                      <Option value="b">B</Option>
                      <Option value="c">C</Option>
                      <Option value="d">D</Option>
                    </Select>
                  </Form.Item>

                  {/* Remove Question Button */}
                  <Button type="link" danger onClick={() => remove(name)}>
                    Remove Question
                  </Button>
                </div>
              ))}

              {/* Add Question Button */}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                style={{ marginTop: "10px" }}
              >
                Add Question
              </Button>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: "#ff0080",
            borderColor: "#ff0080",
            width: "100%",
            marginTop: "10px",
          }}
          loading={loading}
        >
          Apply
        </Button>
      </Form>
    </>
  );
};

export default TeacherAddQuestionModel;
