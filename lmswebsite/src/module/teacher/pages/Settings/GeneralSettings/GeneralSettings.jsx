import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Typography, Row, Col } from "antd";
import dayjs from "dayjs"; // Import dayjs for date handling
import { getTeacherByAuthId } from "../../../../../api/teacherApi";
import { StyledDatePicker, StyledInput } from "./GeneralSettings.style";

const { Title } = Typography;

const GeneralSettings = () => {
  const [form] = Form.useForm();
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState(); // Default date as string
  const[microsoft_id,setMicrosoft_id]=useState(); 
  const [microsoft_principal_name, setMicrosoft_principal_name] = useState(); 

  useEffect(() => {
    const apiCaller = async () => {
      const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const DataTeacher = await getTeacherByAuthId(authId);
      console.log("dfghjk",DataTeacher);

      // Populate fields with data from the API
      setFullName(DataTeacher.teacher.user_id.name);
      setUsername(DataTeacher.teacher.user_id.email);
      setEmail(DataTeacher.teacher.user_id.email);
      setPhone(DataTeacher.teacher.phone_number);
      setMicrosoft_id(DataTeacher.teacher?.microsoft_id);
      setMicrosoft_principal_name(DataTeacher.teacher?.microsoft_principal_name);
      console.log(DataTeacher);

      // Format the date of birth
      const dateObject = new Date(DataTeacher.teacher.dateOfBirth);
      const formattedDate = dateObject.toISOString().split("T")[0];
      setDob(formattedDate);
    };
    apiCaller();
  }, []);
  console.log("ddd", fullName);
  return (
    <>
      {fullName &&

        <div style={{ padding: "24px", background: "#fff", borderRadius: "8px" }}>
          <Title level={3}>General Settings</Title>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              fullName,
              username,
              email,
              phone,
              dob,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Full Name" name="fullName">
                  <StyledInput value={fullName} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Username" name="username">
                  <StyledInput value={username} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email Address" name="email">
                  <StyledInput value={email} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" name="phone">
                  <StyledInput value={phone} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Microsoft Account Id" name="microsoft_id">
                  <StyledInput value={microsoft_id} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Microsoft Principal Name" name="microsoft_principal_name">
                  <StyledInput value={microsoft_principal_name} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Date of Birth" name="dob">
                  <div>
                    {/* <pre>{JSON.stringify(dob)}</pre> Log the value */}
                    <StyledDatePicker
                      value={dob ? dayjs(dob, "YYYY-MM-DD") : null}
                      format="YYYY-MM-DD"
                      disabled
                      style={{ width: "100%" }}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
            
          </Form>
        </div>
      }
    </>

  );
};

export default GeneralSettings;
