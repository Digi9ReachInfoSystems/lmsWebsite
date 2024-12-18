import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Upload, Radio, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import { createStudent } from "../../api/studentApi"; // Replace with your API function
// import "./CreateStudent.css"; // Add custom styles if needed

const { Option } = Select;

const CreateStudent = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Call API to create a student
            //   const response = await createStudent(values);
            message.success("Student created successfully!");
            form.resetFields();
        } catch (error) {
            console.error("Error creating student:", error);
            message.error("Failed to create student. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const uploadProps = {
        beforeUpload: (file) => {
            return false; // Prevent auto upload, handle manually
        },
    };

    return (
        <div className="create-student-container" style={{ padding: "20px" }}>
            <h2>Create New Student</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ mode: "normal" }}
            >

                <Form.Item
                    label="Full Name"
                    name="student_name"
                    rules={[{ required: true, message: "Please enter the student's name" }]}
                >
                    <Input placeholder="Enter student's full name" />
                </Form.Item>
                <Form.Item
                    label="Profile Image"
                    name="profile_image"
                    valuePropName="file"
                >
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, type: "password", message: "Please enter a valid email" }]}
                >
                    <Input placeholder="Enter email" type="password" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[{ required: true, message: "Please enter a phone number" }]}
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: "Please select gender" }]}
                >
                    <Radio.Group>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    rules={[{ required: true, message: "Please select a date of birth" }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Board"
                    name="board_id"
                    rules={[{ required: true, message: "Please select a board" }]}
                >
                    <Select placeholder="Select board">
                        <Option value="board1">Board 1</Option>
                        <Option value="board2">Board 2</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Class"
                    name="class"
                    rules={[{ required: true, message: "Please select a class" }]}
                >
                    <Select placeholder="Select class">
                        <Option value="class1">Class 1</Option>
                        <Option value="class2">Class 2</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Subject"
                    name="subject_id"
                    rules={[{ required: true, message: "Please select a subject" }]}
                >
                    <Select placeholder="Select subject" mode="multiple">
                        <Option value="subject1">Subject 1</Option>
                        <Option value="subject2">Subject 2</Option>
                    </Select>
                </Form.Item>


                <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[{ required: true, message: "Please enter a Duration" }]}
                >
                    <Input placeholder="Enter Duration" />
                </Form.Item>

                {/* <Form.Item
          label="Mode"
          name="mode"
          rules={[{ required: true, message: "Please select a mode" }]}
        >
          <Select>
            <Option value="normal">Normal</Option>
            <Option value="personal">Personal</Option>
          </Select>
        </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Student
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateStudent;
