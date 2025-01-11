// StudentLandingPage.jsx

import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Form, message, Checkbox, Select, Table } from "antd";
import Header from "../../components/Header/Header";
import {
  ApplicationContainer,
  ApplicationDetails,
  StyledRow,
  StyledCol,
  CustomPackageStatus,
} from "./StudentLandingPage.style";
import LoadingPage from "../../../../pages/LoadingPage/LoadingPage";
import { getUserByAuthId } from "../../../../api/userApi";
import { getStudentByAuthId, updateStudent } from "../../../../api/studentApi";
import { getClassesByBoardId } from "../../../../api/classApi";
import { getPackageByClassId } from "../../../../api/packagesApi";
import { getSubjects } from "../../../../services/createBatch";
import { createCustomPackage } from "../../../../api/customPackageApi";
import {
  getCustomTypeOfBatch,
  getTypeOfBatchById,
  getTypeOfBatchBySubjectId,
} from "../../../../api/typeOfBatchApi";
import { useNavigate } from "react-router-dom";
import { getdiscount, getgst } from "../../../../api/pricingApi";

export const StudentLandingPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [studentDataForm, setStudentDataForm] = useState(null);
  const [classData, setClassData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Batch types per subject: { <subjectId>: [array of batchType objects], ... }
  const [batchTypeOptions, setBatchTypeOptions] = useState({});
  // Subjects the user has checked:
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  // Chosen batch type for each subject: { <subjectId>: <batchId>, ... }
  const [selectedBatches, setSelectedBatches] = useState({});
  // Chosen duration for each subject: { <subjectId>: <durationNumber>, ... }
  const [selectedDurations, setSelectedDurations] = useState({});
  // Loading states for batch types per subject
  const [loadingBatchTypes, setLoadingBatchTypes] = useState({});

  const navigate = useNavigate();

  // Cache to avoid refetching batch types for the same subject
  const batchTypeCache = {};

  // Duration options (can be hard-coded or fetched from an API)
  // Using numeric 'value' so we can multiply price * duration
  const durationOptions = [
    { title: "1 month", value: 1 },
    { title: "3 month", value: 3 },
    { title: "8 month", value: 8 },
    { title: "10 month", value: 10 },
  ];

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          message.error("No session data found. Please log in.");
          return;
        }

        // 1) Fetch user & student data
        const user = await getUserByAuthId(sessionData.userId);
        if (!user) {
          message.error("User not found.");
          return;
        }

        const data = await getStudentByAuthId(sessionData.userId);
        if (!data || !data.student) {
          message.error("Student data not found.");
          return;
        }
        setStudentDataForm(data);

        // 2) (Optional) Fetch custom type-of-batch
        await getCustomTypeOfBatch();

        // 3) Fetch packages for current class
        const packageResponse = await getPackageByClassId(
          data.student.class._id,
          "normal"
        );
        setPackagesData(packageResponse);

        // 4) Fetch subjects for the student's class
        const subjectResponse = await getSubjects(data.student.class._id);
        setSubjects(subjectResponse);

        // 5) Fetch classes for the student's board (if needed)
        await getClassesByBoardId(data.student.board_id._id);

        // 6) Handle subscription logic, if needed
        if (
          data.student.custom_package_status === "approved" ||
          (data.student.subscribed_Package !== "" && data.student.is_paid === true)
        ) {
          navigate("/student/dashboard");
        } else if (
          data.student.custom_package_status === "expired" ||
          (data.student.subscribed_Package !== "" && data.student.is_paid === false)
        ) {
          // message.info("Your package has expired. Please renew.");
        }
      } catch (error) {
        console.error("API Caller Error:", error);
        message.error("An error occurred while fetching data.");
      }
    };

    apiCaller();
  }, [navigate]);

  // Upload profile picture handler (unused in this example but included for reference)
  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      setProfilePicture(info.file.originFileObj);
      message.success(`${info.file.name} uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  // Handle subject checkbox changes
  const handleSubjectChange = async (subjectId, checked) => {
    setSelectedSubjects((prev) =>
      checked ? [...prev, subjectId] : prev.filter((id) => id !== subjectId)
    );

    if (checked) {
      // Fetch batch types if not cached
      if (!batchTypeCache[subjectId]) {
        setLoadingBatchTypes((prev) => ({ ...prev, [subjectId]: true }));
        try {
          const batchTypes = await getTypeOfBatchBySubjectId(subjectId);
          batchTypeCache[subjectId] = batchTypes;
          setBatchTypeOptions((prev) => ({
            ...prev,
            [subjectId]: batchTypes,
          }));
        } catch (error) {
          message.error(`Failed to load batch types for subject.`);
        } finally {
          setLoadingBatchTypes((prev) => ({ ...prev, [subjectId]: false }));
        }
      }
    } else {
      // Clear batch type and duration if user unchecks
      setSelectedBatches((prev) => {
        const updated = { ...prev };
        delete updated[subjectId];
        return updated;
      });
      setSelectedDurations((prev) => {
        const updated = { ...prev };
        delete updated[subjectId];
        return updated;
      });
    }
  };

  // Handle batch-type dropdown changes
  const handleBatchChange = (subjectId, batchId) => {
    setSelectedBatches((prev) => ({ ...prev, [subjectId]: batchId }));
  };

  // Handle duration dropdown changes
  const handleDurationChange = (subjectId, durationValue) => {
    setSelectedDurations((prev) => ({ ...prev, [subjectId]: durationValue }));
  };

  // Submission
  const handleSubmit = async () => {
    // 1) Check minimum subjects
    if (selectedSubjects.length < 3) {
      message.error("Please select at least 3 subjects.");
      return;
    }

    // 2) Ensure each subject has a batch type
    const allBatchesSelected = selectedSubjects.every(
      (subjectId) => selectedBatches[subjectId]
    );
    if (!allBatchesSelected) {
      message.error("Please select a batch type for each selected subject.");
      return;
    }

    // 3) Ensure each subject has a duration
    const allDurationsSelected = selectedSubjects.every(
      (subjectId) => selectedDurations[subjectId]
    );
    if (!allDurationsSelected) {
      message.error("Please select a duration for each selected subject.");
      return;
    }

    // 4) Build the array for type_of_batch
    const typeOfBatchArray = selectedSubjects.map((subjectId) => ({
      _id: subjectId,
      type_of_batch: selectedBatches[subjectId],
      duration: selectedDurations[subjectId], // number of months
    }));

    // 5) Calculate totalAmount (must wait for each getTypeOfBatchById call)
    // let totalAmount = 0;

    // Option A: for...of loop (sequential)
    // for (const item of typeOfBatchArray) {
    //   const data = await getTypeOfBatchById(item.type_of_batch);
    //   totalAmount += data.price * item.duration;
    // }

    // (Alternative) Option B: Promise.all (parallel fetch)
    const amounts = await Promise.all(
      typeOfBatchArray.map(async (item) => {
        const data = await getTypeOfBatchById(item.type_of_batch);
        return data.price * item.duration;
      })
    );
    const gst=await getgst();
    const disc=await getdiscount();
    const totalAmount = (amounts.reduce((acc, val) => acc + val, 0));
    const discountAmount=(totalAmount/100)*disc.discount;
    const discountedAmount=totalAmount-discountAmount;
    const gstAmount=(discountedAmount/100)*gst.gst;
    const finalAmount=discountedAmount+gstAmount;
    console.log("finalAmount", finalAmount);
    console.log("discountAmount", discountAmount);
    console.log("discountedAmount", discountedAmount);

    console.log("typeOfBatchArray", typeOfBatchArray);
    console.log("final totalAmount", totalAmount);

    // 6) Prepare data for the API
    const submissionData = {
      name: studentDataForm.student.user_id.name,
      student_id: studentDataForm.student._id,
      email: studentDataForm.student.user_id.email,
      phone: studentDataForm.student.phone_number,
      board_id: studentDataForm.student.board_id._id,
      class_id: studentDataForm.student.class._id,
      subjects: selectedSubjects,
      batches: selectedBatches,
    };
    console.log("submissionData", submissionData);

    // 7) Call your APIs
    try {
      // Update the student with the new type_of_batch array
      await updateStudent(studentDataForm.student._id, {
        updateData: {
          subject_id: typeOfBatchArray,
          amount: finalAmount,
          discountAmount:discountAmount,
          gstAmount:gstAmount
        },
      });

      // If you need a custom package:
      // await createCustomPackage({
      //   subject_id: selectedSubjects,
      //   student_id: studentDataForm.student._id,
      //   type_of_batch: typeOfBatchArray,
      // });

      message.success("Combo selected successfully!");
      navigate("/paymentScreen",{ state: { totalAmount:totalAmount,discountAmount:discountAmount,gst:gstAmount } }); // e.g., navigate to your payment screen
    } catch (err) {
      console.error("Error submitting Packages:", err);
      message.error("Failed to submit the request. Please try again.");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Subject",
      dataIndex: "subjectName",
      key: "subjectName",
    },
    {
      title: "Batch Type",
      dataIndex: "batchType",
      key: "batchType",
      render: (text, record) => {
        const subjectId = record.subjectId;
        const batchTypes = batchTypeOptions[subjectId] || [];
        const loading = loadingBatchTypes[subjectId];

        return (
          <Select
            placeholder="Select Batch Type"
            value={selectedBatches[subjectId]}
            onChange={(value) => handleBatchChange(subjectId, value)}
            loading={loading}
            style={{ width: 200 }}
          >
            {batchTypes.map((batch) => (
              <Select.Option key={batch._id} value={batch._id}>
                {batch.mode}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, record) => {
        const subjectId = record.subjectId;
        return (
          <Select
            placeholder="Select Duration"
            style={{ width: 150 }}
            value={selectedDurations[subjectId]}
            onChange={(value) => handleDurationChange(subjectId, value)}
          >
            {durationOptions.map((dur) => (
              <Select.Option key={dur.value} value={dur.value}>
                {dur.title}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  // Table data
  const tableData = selectedSubjects.map((subjectId) => {
    const subject = subjects.find((subj) => subj._id === subjectId);
    return {
      key: subjectId,
      subjectId,
      subjectName: subject ? subject.subject_name : "N/A",
      batchType: selectedBatches[subjectId] || null,
      duration: selectedDurations[subjectId] || null,
    };
  });

  return studentDataForm ? (
    <>
      <Header />
      {(studentDataForm.student.custom_package_status === "no_package" ||
        studentDataForm.student.custom_package_status === "expired") ? (
        <ApplicationContainer>
          <ApplicationDetails>
            <div className="studentApplicationDetails">
              <h2>Create Your Own Package!</h2>
              <p>Add subjects of your choice to enroll.</p>

              <Form layout="vertical" onFinish={handleSubmit}>
                {/* Row 1: Name, Email, Phone */}
                <StyledRow>
                  <StyledCol>
                    <Form.Item label="Name" name="name" style={{ padding: "5px" }}>
                      {studentDataForm.student.user_id.name}
                    </Form.Item>
                  </StyledCol>
                  <StyledCol>
                    <Form.Item label="Email" name="email" style={{ padding: "5px" }}>
                      {studentDataForm.student.user_id.email}
                    </Form.Item>
                  </StyledCol>
                  <StyledCol>
                    <Form.Item label="Phone" name="phone" style={{ padding: "5px" }}>
                      {studentDataForm.student.phone_number}
                    </Form.Item>
                  </StyledCol>
                </StyledRow>

                {/* Row 2: Gender, Board, Class */}
                <StyledRow>
                  <StyledCol>
                    <Form.Item label="Gender" name="gender" style={{ padding: "5px" }}>
                      {studentDataForm.student.gender}
                    </Form.Item>
                  </StyledCol>
                  <StyledCol>
                    <Form.Item label="Board" name="board" style={{ padding: "5px" }}>
                      {studentDataForm.student.board_id?.name}
                    </Form.Item>
                  </StyledCol>
                  <StyledCol>
                    <Form.Item label="Class" name="class" style={{ padding: "5px" }}>
                      {studentDataForm.student.class.classLevel}
                    </Form.Item>
                  </StyledCol>
                </StyledRow>

                {/* Subjects Selection */}
                <StyledRow>
                  <StyledCol span={24}>
                    <Form.Item label="Select Subjects (Minimum 3)">
                      {subjects.map((subject) => (
                        <div
                          key={subject._id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <Checkbox
                            onChange={(e) =>
                              handleSubjectChange(subject._id, e.target.checked)
                            }
                            checked={selectedSubjects.includes(subject._id)}
                          >
                            {subject.subject_name}
                          </Checkbox>
                        </div>
                      ))}
                    </Form.Item>
                  </StyledCol>
                </StyledRow>

                {/* Selected Subjects & Batch Types Table */}
                {selectedSubjects.length > 0 && (
                  <StyledRow>
                    <StyledCol span={24}>
                      <Form.Item label="Selected Subjects and Batch Types" required>
                        <Table
                          dataSource={tableData}
                          columns={columns}
                          pagination={false}
                        />
                      </Form.Item>
                    </StyledCol>
                  </StyledRow>
                )}

                {/* Submit Button */}
                <StyledRow style={{ justifyContent: "flex-end" }}>
                  <StyledCol>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          background: "purple",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          margin: "auto",
                          borderColor: "#82194B",
                        }}
                      >
                       Next
                      </Button>
                    </Form.Item>
                  </StyledCol>
                </StyledRow>
              </Form>
            </div>
          </ApplicationDetails>
        </ApplicationContainer>
      ) : studentDataForm.student.custom_package_status === "pending" ? (
        <CustomPackageStatus>Your Custom Package is under review.</CustomPackageStatus>
      ) : studentDataForm.student.custom_package_status === "rejected" ? (
        <CustomPackageStatus>Your Custom Package Request was Rejected.</CustomPackageStatus>
      ) : (
        <CustomPackageStatus>Unexpected package status.</CustomPackageStatus>
      )}
    </>
  ) : (
    <LoadingPage />
  );
};
