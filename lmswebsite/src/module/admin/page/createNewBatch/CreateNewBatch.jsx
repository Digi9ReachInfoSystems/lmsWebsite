import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, DatePicker, Upload, message, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createBatch, getAllBatches } from "../../../../api/batchApi";
import { getClasses, getSubjects, getTeachersBySubjectAndClass } from "../../../../services/createBatch";
import { getEligibleStudentsForBatch, getStudentsByClassId, getStudentsForBatchBySubjectId } from "../../../../api/studentApi";
import { uploadFileToFirebase } from "../../../../utils/uploadFileToFirebase";
import { CreateNewBatchWrap } from "./CreateNewBatch.Styles"; // Import styles
import { getAllTypeOfBatches, getCustomTypeOfBatch, getTypeOfBatchById, getTypeOfBatchBySubjectId } from "../../../../api/typeOfBatchApi";
import { set } from "lodash";
import dayjs from "dayjs";
import { getBoards } from "../../../../api/boardApi";
import { getClassesByBoardId } from "../../../../api/classApi";
import { batchCreatedAdmin } from "../../../../api/mailNotificationApi";

const { Option } = Select;

const CreateNewBatch = ({ open, closeModal }) => {
  const [form] = Form.useForm();
  const [board, setBoard] = useState([]);
  const [selctedBoard, setSelectedBoard] = useState('');
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [typeOfBatch, setTypeOfBatch] = useState([]);
  const [selectedTypeOfBatch, setSelectedTypeOfBatch] = useState('');
  const [mode, setMode] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [selectionLength, setSelectionLength] = useState(0);
  const[batchType, setBatchType] = useState();
  useEffect(() => {

    const apicaller = async () => {
      const response = await getBoards();
      ////console.log("response", response);
      setBoard(response);
    }
    apicaller();

  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      const classData = await getClassesByBoardId(selctedBoard);
      setClasses(classData || []);
      // const typeOfBatchData = await getAllTypeOfBatches();
      // setTypeOfBatch(typeOfBatchData || []);
    };
    fetchClasses();
  }, [selctedBoard]);
  useEffect(() => {
    const apicaller = async () => {
      const typeOfBatchData = await getTypeOfBatchById(selectedTypeOfBatch);
      switch (typeOfBatchData.mode) {
        case "1:1":
          setSelectionLength(1);
          ////console.log("selectionLength", 1);
          break;
        case "1:3":
          setSelectionLength(3);
          //console.log("selectionLength", 3);
          break;
        case "1:5":
          setSelectionLength(5);
          //console.log("selectionLength", 5);
          break;
        case "1:7":
          setSelectionLength(7);
          //console.log("selectionLength", 7);
          break;
        default:
          setSelectionLength(0);
          break;
      }
    }
    apicaller();
  }, [selectedTypeOfBatch])

  const handleClassChange = async (value) => {
    const subjectData = await getSubjects(value);
    // const studentData = await getStudentsByClassId(value);
    setSubjects(subjectData || []);
    // setStudents(studentData.students || []);
    form.setFieldsValue({
      subject: undefined,
      teachers: undefined,
      students: undefined,
    });
  };

  const handleSubjectChange = async (value) => {
    if(batchType){
      const typeOfBatchData = await getCustomTypeOfBatch();
      setTypeOfBatch(typeOfBatchData || []);
    }else{
      const typeOfBatchData = await getTypeOfBatchBySubjectId(value);
      setTypeOfBatch(typeOfBatchData || []);
    }
   
    const teacherData = await getTeachersBySubjectAndClass(value, form.getFieldValue("class"));
    // const studentData = await getStudentsForBatchBySubjectId(value, mode);
    //console.log("hehehe", { subject_id: value, type_of_batch: form.getFieldValue("type_of_batch"), duration: form.getFieldValue("duration") })
    const filterData = { subject_id: value, type_of_batch: form.getFieldValue("type_of_batch"), duration: form.getFieldValue("duration") };
    const studentData = await getEligibleStudentsForBatch(filterData);
    //console.log("studentData", studentData);
    // if (studentData.customPackageCriteria.length > 0 || studentData.normalCriteria.length > 0) {
    //   const totalStudents = studentData.customPackageCriteria.concat(studentData.normalCriteria);
    //   //console.log("totalStudents", totalStudents);
    //   setStudents(totalStudents);
    // } else {
    //   setStudents([]);
    // }
    setStudents(studentData.students || []);
    setTeachers(teacherData || []);
    form.setFieldsValue({ teachers: undefined });
  };

  const handleFileUpload = async (info) => {

    const url = await uploadFileToFirebase(info.file, "batchImages");
    //console.log("url", url);

    form.setFieldsValue({ batchImage: url });
    message.success("File uploaded successfully!");

  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      //console.log("Form Values:", values);
      // const batchData = {
      //   ...values,
        // date: values.date.format("YYYY-MM-DD"),
      //   teachers: values.teachers || [],
      //   students: values.students || [],
      // };
      // //console.log("batchData", batchData);
      // let currentDate = dayjs(); // Get the current date
      //  const newDate = currentDate.add(values.duration, "month").format("YYYY-MM-DD");
      const submissionData = {
        batch_name: values.batchName,
        batch_image: values.batchImage,
        teacher_id: values.teachers,
        class_id: values.class,
        students: values.students,
        subject_id: values.subject,
        date: values.date.format("YYYY-MM-DD"),
        type_of_batch: values.type_of_batch,

      }
      await batchCreatedAdmin(submissionData.teacher_id,submissionData.students,submissionData.subject_id,submissionData.batch_name);
      //console.log("submissionData", submissionData);

      const response = await createBatch(submissionData);
      if (response?.message) {
        message.success("Batch created successfully!");
        form.resetFields();
        closeModal(); // Close modal on success
      }
    } catch (error) {
      message.error("Failed to create batch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateNewBatchWrap>
      <Modal
        title="Create New Batch"
        open={open}
        onCancel={closeModal}
        footer={null}
        centered
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="batchName"
            label="Batch Name"
            rules={[{ required: true, message: "Please enter the batch name" }]}
          >
            <Input placeholder="Enter batch name" />
          </Form.Item>
          {/* <Form.Item
            name="typeofBatch"
            label="Select Cutom/Normal"
            rules={[
              {
                required: true,
                message: "Please select a Type of Batch",
              },
            ]}
          >
            <Select
              placeholder="Select Type of Batch"
              onChange={(value) => {
                //console.log("value", value);
                setBatchType(value);
              }}
              allowClear
            >
             
                <Option key={1} value={true}>
                 Custom
                </Option>
                <Option key={2} value={false}>
                 Normal
                </Option>
            
            </Select>
          </Form.Item> */}
          <Form.Item
            name="board_id"
            label="Select Board"
            rules={[
              {
                required: true,
                message: "Please select a board",
              },
            ]}
          >
            <Select
              placeholder="Select Board"
              onChange={(value) => {
                //console.log("value", value);
                setSelectedBoard(value);
              }}
              allowClear
            >
              {board.map((board) => (
                <Option key={board._id} value={board._id}>
                  {board.name}
                </Option>
              ))}
            </Select>
          </Form.Item>


          {/* <Form.Item
            name="batchMode"
            label="Batch Mode"
            rules={[{ required: true, message: "Please select a batch mode" }]}
          >
            <Radio.Group onChange={(e) => setMode(e.target.value)}>
              <Radio value="normal">Normal</Radio>
              <Radio value="personal">Personal</Radio>
            </Radio.Group>

          </Form.Item> */}

          <Form.Item
            name="class"
            label="Class"
            rules={[{ required: true, message: "Please select a class" }]}
          >
            <Select placeholder="Select class" onChange={handleClassChange}>
              {classes.map((cls) => (
                <Option key={cls._id} value={cls._id}>
                  {cls.classLevel}
                </Option>
              ))}
            </Select>
          </Form.Item>


          {/* <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please enter the batch duration" }]}
          >
            <Input placeholder="Enter batch duration" type="Number" min={0} />
          </Form.Item> */}
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please select a subject" }]}
          >
            <Select
              placeholder="Select subject"
              onChange={handleSubjectChange}
              disabled={!subjects.length}
            >
              {subjects.map((subj) => (
                <Option key={subj._id} value={subj._id}>
                  {subj.subject_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="type_of_batch"
            label="Type Of Batch"
            rules={[{ required: true, message: "Please select a Type Of Batch" }]}
          >
            <Select
              placeholder="Select Batch Type"
              onChange={() => { 
                setSelectedTypeOfBatch(form.getFieldValue("type_of_batch"))
                handleSubjectChange(form.getFieldValue("subject"))
               }}
            // disabled={!subjects.length}
            >
              {typeOfBatch.map((batch) => (
                <Option key={batch._id} value={batch._id}>
                  {batch.mode}
                </Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item
            name="teachers"
            label="Teachers"
            rules={[{ required: true, message: "Please select teachers" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select teachers"
              options={teachers?.map((teacher) => ({
                label: teacher.user_id.name,
                value: teacher._id,
              }))}
              disabled={!teachers.length}
            />
          </Form.Item>
          {students &&
            <Form.Item name="students" label="Students">
              <Select
                mode="multiple"
                placeholder="Select students"
                options={students?.map((student) => ({
                  label: student?.user_id?.name,
                  value: student?._id,
                }))}
                disabled={!students.length}
                onChange={(value) => {
                  if (value.length > selectionLength) { // Restrict selection to 5 students
                    message.warning("You can select up to 5 students only!");
                    return;
                  }
                  form.setFieldsValue({ students: value }); // Update selected values
                }}
              />
            </Form.Item>
          }

          <Form.Item
            name="date"
            label="Start Date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="batchImage" label="Upload Batch Image" valuePropName="file">
            <Upload
              name="file"
              accept="image/*"
              customRequest={handleFileUpload}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ background: "#EE1B7A", borderColor: "#EE1B7A" }}
            >
              {loading ? "Creating..." : "Create Batch"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </CreateNewBatchWrap>
  );
};

export default CreateNewBatch;
