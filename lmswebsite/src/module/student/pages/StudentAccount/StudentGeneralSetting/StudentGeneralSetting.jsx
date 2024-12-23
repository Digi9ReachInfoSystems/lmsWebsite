import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Typography, Row, Col } from "antd";
import dayjs from "dayjs"; // Import dayjs for date handling
import { getStudentByAuthId } from "../../../../../api/studentApi";
import { StyledDatePicker, StyledInput } from "./StudentGeneralSetting.style";
import { Heading, PageContainer, Subheading } from "../../../../../style/PrimaryStyles/PrimaryStyles";
import Animation from "../../../../student/assets/Animation.json";
import Lottie from "lottie-react";
const { Title } = Typography;

const GeneralSettings = () => {
  const [form] = Form.useForm();
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState(); // Default date as string
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const DataStudent = await getStudentByAuthId(authId);

      // Populate fields with data from the API
      setFullName(DataStudent.student.user_id.name);
      setUsername(DataStudent.student.user_id.email);
      setEmail(DataStudent.student.user_id.email);
      setPhone(DataStudent.student.phone_number);
      
      // console.log(DataStudent);

      // Format the date of birth
      const dateObject = new Date(DataStudent.student.dateOfBirth);
      const formattedDate = dateObject.toISOString().split("T")[0];
      setDob(formattedDate);

      setLoading(false);

    };
    apiCaller();

  }, []);
  ////console.log("ddd", fullName);

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
          <Lottie
            animationData={Animation}
            loop={true}
          />
        </div>
      </div>
    );
  }

  return (
    <PageContainer> 

      
{fullName &&

<div style={{ padding: "24px", background: "#fff", borderRadius: "8px" }}>
  <Subheading level={3}>General Settings</Subheading>
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
    {/* <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Date of Birth" name="dob">
          <div>
           
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
     */}
  </Form>
</div>
}
    </PageContainer>

  );
};

export default GeneralSettings;
