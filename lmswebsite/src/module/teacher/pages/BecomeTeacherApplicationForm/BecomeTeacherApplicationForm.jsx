import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { FaCloudUploadAlt } from "react-icons/fa";
import Header from "../../components/Header/Header";
import LMS from "../../components/LMS/LMS";
import BecomeTeacherLogo from "../../assets/BecomeTeacherLogo.png";
import { getTeacherApplicationsByUserId, submitTeacherApplication } from "../../../../api/teachersApplicationApi";
import TeachersSection from "../../components/TeacherSection/TeachersSection";
import FooterTeacher from "../../components/Footer/FooterTeacher";
import { getAllClasses, getClassesByBoardId } from "../../../../api/classApi";
import {
  ApplicationContainer,
  Form,
  UploadWrapper,
  Processing,
} from "./BecomeTeacherApplicationForm.styles";
import { useNavigate } from 'react-router-dom';
import { getUserByAuthId } from "../../../../api/userApi";
import { getAllSubjects } from "../../../../api/subjectApi";
import {
  getClasses,
  getSubjects,
  getTeachersBySubjectAndClass,
  getStudentsBySubjectAndClass,
} from "../../../../services/createBatch";
import { updateUserByAuthId } from "../../../../api/userApi"
import api from "../../../../config/axiosConfig";
import { getBoards } from "../../../../api/boardApi";

const BecomeTeacherApplicationForm = () => {
  const [formVisibility, setFormVisibility] = useState(true);
  const [formProcessing, setFormProcessing] = useState(false);
  const [formReject, setFormReject] = useState(false);
  const [slectedSubject, setSelectedSubject] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    state: "",
    city: "",
    pincode: "",
    phone_number: "",
    current_position: "",
    language: "",
    experience: "",
    resume: null,
    class_id: null,
    subject_id: null,
    profileImage: null,
    board_id: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));

  };
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("sessionData"));
    const apicaller = async () => {
      // const subjectData = await getAllSubjects();
      const board = await getBoards();
      setBoardData(board);

      // setSubjects(subjectData);
      const userresponse = await getUserByAuthId(session.userId);
      try {
        const response = await getTeacherApplicationsByUserId(userresponse.user._id);

        if (response.application.approval_status === "pending") {
          setFormVisibility(false);
          setFormProcessing(true);
        } else if (response.application.approval_status === "rejected") {
          setFormProcessing(false);
          setFormVisibility(false);
          setFormReject(true);
        } else if (response.application.approval_status === "approved") {
          navigate("/teacher/dashboard");
        }



      } catch (err) {
        if (err.response.status === 404) {
          setFormVisibility(true);
          setFormProcessing(false);
          setFormReject(false);
        }
        console.error("Error fetching teacher applications:", err);
      }


    }
    apicaller();
  }, []);

  useEffect(() => {
    const apicaller = async () => {
      const classData = await getClassesByBoardId(selectedBoard);

      setClasses(classData);
      console.log("classes", classData);
    }
    apicaller();
  }, [selectedBoard]);

  useEffect(() => {
    if (selectedClass.length > 0) {
      const fetchSubjects = async () => {
        selectedClass.forEach(async (item) => {
          const data = await getSubjects(item.value)
          console.log("sss data", data);
          setSubjects(subjects.concat(data));
        })
        console.log("inside ", subjects);
      };
      fetchSubjects();
    } else {
      setSubjects([]);
    }
  }, [selectedClass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setTimeout(() => setSuccess(null), 3000);
      setFormData((prev) => ({ ...prev, subject_id: slectedSubject.map((option) => option.value) }));
      setFormData((prev) => ({ ...prev, class_id: selectedClass.map((option) => option.value) }));
      setFormData((prev) => ({ ...prev, board_id: selectedBoard }));
      setTimeout(() => setSuccess(null), 3000);
      const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const responseUser = await updateUserByAuthId(authId, { name: formData.name, phone_number: formData.phone_number });
      const submissionData = {
        phone_number: formData.phone_number,
        class_id: formData.class_id,
        subject_id: formData.subject_id,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        current_position: formData.current_position,
        experience: formData.experience,
        language: formData.language,
        resume_link: formData.resume,
        profileImage: formData.profileImage,
        board_id: formData.board_id
      }
      const response = await submitTeacherApplication(submissionData);

      alert("Application submitted successfully!");
      window.location.reload();
      console.log("Application Response:", response);
    } catch (error) {
      alert("Failed to submit the application. Please try again.");
      console.error("Application Submission Error:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />{formVisibility &&
        <ApplicationContainer>
          <div className="applicationImage">
            <img src={BecomeTeacherLogo} alt="Teacher Form" className="teacherformImage" />
          </div>
          <div className="applicationDetails">
            <h2 className="applicationFormTitle">Love Teaching Students? Join Us</h2>
            <p className="applicationFormSubtitle">
              Become a Teacher and train students all around the world.
            </p>

            <Form onSubmit={handleSubmit}>
              <div className="applicationRowOne">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="applicationRowTwo">
                <input
                  type="tel"
                  name="pincode"
                  placeholder="Enter PinCode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="experience"
                  placeholder="Enter Experience"
                  min="0"
                  max="100"
                  onChange={handleInputChange}
                  required
                />

                <select
                  name="current_position"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Position</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Assistant">Assistant</option>
                  <option value="Principal">Principal</option>
                </select>

                {/* <select
                  name="subjects"
                  isMultiple
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Experience</option>
                  <option value="0">Fresher</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4+ Years</option>
                </select> */}
              </div>

              <div className="applicationRowThree">
                <select
                  name="language"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>

                <UploadWrapper>

                  <label className="uploadLabel">
                    <span>Upload Resume</span>
                    <FaCloudUploadAlt className="uploadIcon" />
                  </label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    required
                    className="file-input"
                  />
                </UploadWrapper>

                <UploadWrapper>

                  <label className="uploadLabel">
                    <span>Upload Profile Image</span>
                    <FaCloudUploadAlt className="uploadIcon" />
                  </label>
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleFileChange}
                    required
                    className="file-input"
                  />
                </UploadWrapper>
              </div>
              <div className="applicationRowThree">
                <Select
                  placeholder="Select Board"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={boardData.map((board) => ({
                    value: board._id,
                    label: board.name,
                  }))}
                  onChange={(option) => setSelectedBoard(option.value)}
                  required
                />
              </div>
              <div className="applicationRowThree">
                {selectedBoard &&
                  <Select
                  isMulti
                  placeholder="Select classes..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={classes.map((classItem) => ({
                    value: classItem._id,
                    label: classItem.classLevel + " - " + classItem.className,
                  }))}
                  onChange={(options) => {
                    setSelectedClass(options);
                  }}
                />}
              </div>
              <div className="applicationRowThree">
                {console.log("Subjects:", subjects)}
                {subjects &&

                  <Select
                    isMulti
                    placeholder="Select subjects..."
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={subjects.map((subject) => ({
                      value: subject._id,
                      label: subject.subject_name,
                    }))}
                    onChange={(options) => {
                      // setSelectedSubject(slectedSubject.concat(options));
                      setSelectedSubject(options);
                      console.log("Selected subjects:", slectedSubject.map((option) => option.value));
                    }}
                  />}
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          </div>
        </ApplicationContainer>

      }
      <Processing visible={(formProcessing || formReject)}>

        <div className="applicationUnderProcessing">
          {
            formProcessing && <p>Application Under Processing....!!!!</p>
          }

        </div>
        <div>
          {
            formReject && <p>Application Rejected... Better Luck Next Time</p>
          }

        </div>
      </Processing>


      <LMS />
      <TeachersSection />
      <FooterTeacher />
    </>
  );
};

export default BecomeTeacherApplicationForm;
