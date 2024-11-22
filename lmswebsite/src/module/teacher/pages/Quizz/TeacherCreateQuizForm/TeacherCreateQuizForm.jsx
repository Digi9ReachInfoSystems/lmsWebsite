// src/components/QuizForm/TeacherCreateQuizForm.jsx
import React, { useState, useEffect } from 'react';
import {
  ModalOverlay,
  ModalContent,
  Button,
  FormTitle,
  Label,
  Input,
  TextArea,
  CreateButton,
  AddQuestionLink,
  FormRow,
} from './TeacherCreateQuizForm.style';
import TeacherAddQuestionModel from '../TeacherAddQuestionModel/TeacherAddQuestionModel';
import { getBatchesByTeacherId } from '../../../../../api/batchApi';
// import {getSingleTeacherApplicationUsingUserId} from '../../../../../../api/teachersApplicationApi';
import { getUserProfile } from '../../../../../api/userApi';
import { getTeacherByAuthId } from '../../../../../api/teacherApi';
import { getTeacherById } from '../../../../../api/teacherApi';

const TeacherCreateQuizForm = ({ onSubmit, onClose, teacherId }) => { // Receive teacherId as a prop
  const [formData, setFormData] = useState({
    title: '',
    batch: '',
    subject: '',
    classLevel: '',
    description: '',
    questions: [],
  });


  const [selectedBatchIndex, setSelectedBatchIndex] = useState(null);
  const [subjectData, setSubjectData] = useState([]);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [classData, setClassData] = useState(null);
  const [teacherIdData, setTeacherIdData] = useState(null);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log("Selected Batch Index:", selectedBatchIndex);
    if (selectedBatchIndex !== null) {
      setSubjectData(batches.map((batch, index) => {
        if (batch._id === selectedBatchIndex) {
          return batch.subject_id;
        }
      }));

      const classD = batches.map((batch, index) => {
        if (batch._id === selectedBatchIndex) {


          return { id: batch.class_id._id, name: batch.class_id.classLevel };
        }
      })

      setClassData(classD[0]);
      console.log("Class Data:", classData);
    }
  }, [selectedBatchIndex])



  // Fetch batches, subjects, and class levels on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {

        const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
        const teacherData = await getTeacherByAuthId(authId);
        console.log("Teacher Data:", teacherData);
        const fetchedBatches = await getBatchesByTeacherId(teacherData.teacher._id);
        // console.log("Fetched Batches:", fetchedBatches);

        setTeacherIdData(teacherData.teacher._id)
        setBatches(fetchedBatches);

        let batchesData = fetchedBatches; 

        // Attempt to extract batches from known keys
        if (fetchedBatches.batches && Array.isArray(fetchedBatches.batches)) {
          batchesData = fetchedBatches.batches;
        } else if (fetchedBatches.data && Array.isArray(fetchedBatches.data)) {
          batchesData = fetchedBatches.data;
        }

        const sessionData = localStorage.getItem('sessionData');
        const userData = await getUserProfile(sessionData.userId);
        // console.log('User Data:', userData.user._id);

        // Fetch all subjects
        // const subjectsData = await getTeacherById(userData.user._id);
        // // console.log('Subjects Data:', subjectsData);
        // setSubjects(Array.isArray(subjectsData) ? subjectsData : []);

        // // Fetch all class levels
        // const classLevelsData = await fetchClassLevels();
        // setClassLevels(Array.isArray(classLevelsData) ? classLevelsData : []);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load form data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("gg", formData);
  };

  const openQuizDialog = () => setShowQuizDialog(true);
  const closeQuizDialog = () => setShowQuizDialog(false);

  const handleSaveQuestions = (questionsData) => {
    console.log("questionsData", questionsData);
    setFormData({
      ...formData,
      questions: questionsData,
    });
    setShowQuizDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.questions.length === 0) {
      alert('Please add at least one question.');
      return;
    }

    setFormData({
      ...formData,
      classLevel: classData.id,
    });

    if (onSubmit) {
      const submissionData = {

        quiz_title: formData.title,
        teacher_id: teacherIdData,  // Replace with a valid teacher ObjectId from your database
        batch_index: formData.batch,
        class_level: classData.id,
        subject: formData.subject,  // Replace with a valid subject ObjectId from your database
        description: formData.description,
        // dueDate: "2024-11-30T23:59:59.000Z",
        questions: formData.questions,


      }
      console.log("submitting data", submissionData);
      onSubmit(submissionData);
    }
  };

  if (loading) {
    return (
      <ModalOverlay>
        <ModalContent>
          <p>Loading...</p>
        </ModalContent>
      </ModalOverlay>
    );
  }

  if (error) {
    return (
      <ModalOverlay>
        <ModalContent>
          <p style={{ color: 'red' }}>{error}</p>
          <Button onClick={onClose}>Close</Button>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <Button onClick={onClose}>X</Button>
        <form onSubmit={handleSubmit}>
          <FormTitle>Create a New Quiz</FormTitle>

          {/* Title Input */}
          <FormRow>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormRow>

          {/* Batch Select */}
          <FormRow>
            <Label>Batch</Label>
            <select
              name="batch"
              value={formData.batch}
              onChange={(e) => { setSelectedBatchIndex(e.target.value); handleChange(e); }}
              required
              style={{
                width: '70%',
                padding: '0.5em',
                borderRadius: '5px',
                border: '2px solid #ccc',
              }}
            >
              <option value="">Select Batch</option>
              {batches.map((batch, index) => (
                <option key={batch._id} value={batch._id}>
                  {batch.batch_name} {/* Adjust based on actual batch field */}
                </option>
              ))}
            </select>
          </FormRow>

          {/* Class Level Select */}


          {/* Subject Select */}
          <FormRow>
            <Label>Subject</Label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={{
                width: '70%',
                padding: '0.5em',
                borderRadius: '5px',
                border: '2px solid #ccc',
              }}
            >
              <option value="">Select Subject</option>
              {subjectData.map((subject,index) => (
                <option key={subject._id} value={subject?._id||index}>
                  {subject.subject_name} {/* Adjust based on actual subject field */}
                </option>
              ))}
            </select>
          </FormRow>

          {/* Description TextArea */}
          <FormRow>
            <Label>Description</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormRow>
          {classData &&
            <FormRow>
              <Label>ClassLevel</Label>
              <TextArea
                name="ClassLevel"
                value={classData.name}
                onChange={handleChange}
                required
              />
            </FormRow>}

          {/* Quiz Questions */}
          <FormRow>
            <Label>Quiz Questions</Label>
            <AddQuestionLink type="button" onClick={openQuizDialog}>
              Add Questions
            </AddQuestionLink>
          </FormRow>

          {/* Display number of questions added */}
          {formData.questions.length > 0 && (
            <p>{formData.questions.length} question(s) added.</p>
          )}

          {/* Create Quiz Button */}
          <CreateButton type="submit">Create Quiz</CreateButton>
        </form>
      </ModalContent>

      {/* TeacherAddQuiz dialog/modal */}
      {showQuizDialog && (
        <ModalOverlay>
          <ModalContent>
            <TeacherAddQuestionModel onSave={handleSaveQuestions} />
            <Button onClick={closeQuizDialog}>Close</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </ModalOverlay>
  );
};

export default TeacherCreateQuizForm;
