// ManageContentTable.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Table, Modal, message, Popconfirm, Alert, Form, InputNumber, Button, Input, Row, Col, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Container,
  Title,
  StyledButton,
} from './ManageContentTable.style';
import ClassForm from '../ClassForm/ClassForm';
import SubjectForm from '../SubjectForm/SubjectForm';
import BoardForm from '../BoardForm/BoardForm';
import PackageForm from '../PackageForm/PackageForm';
import FaqForm from '../FaqForm/FaqForm';
import BannerForm from '../BannerForm/BannerForm';
import ChooseUsForm from '../ChooseUsForm/ChooseUsForm';
import BenefitForm from '../BenifitsForm/BenifitsForm';
import ModeBatch from '../ModeBatch/ModeBatch';
import BlogForm from '../BlogForm/BlogForm';
import {
  getAllClasses,
  createClass,
  deleteClass,
} from '../../../../../api/classApi';
import {
  getAllSubjects,
  createSubject,
  deleteSubjectById,
} from '../../../../../api/subjectApi';
import { getBoards, createBoard, deleteBoard } from '../../../../../api/boadApi';
import {
  getAllPackages,
  createPackage,
  deletePackageById,
} from '../../../../../api/packagesApi';
import { getAllFAQ, createFAQ, deleteFAQ } from '../../../../../api/faq';
import { getBanners, createBanner, deleteBanner } from '../../../../../api/bannerApi';
import {
  createChooseUsFeature,
  deleteChooseUsFeature,
  getChooseUsData,
} from '../../../../../api/chooseUsApi';
import {
  createBenefit,
  getAllBenefits,
  deleteBenefit,
} from '../../../../../api/benefitsApi';
import {
  createTypeOfBatch,
  getAllTypeOfBatches,
  deleteTypeOfBatch,
  updateTypeOfBatch,
  discountTypeOfBatch,
} from '../../../../../api/typeOfBatchApi';
import { createBlog, getAllBlogs, deleteBlog } from '../../../../../api/blogApi';
import Animation from "../../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
import { FaPlus, FaTrash } from "react-icons/fa";
// Removed unused import
// import { render } from '@fullcalendar/core/preact.js';

const ManageContentTable = ({ contentType }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for Edit Price Modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [error, setError] = useState("");

  // State for Discount Modal
  const [isDiscountModalVisible, setIsDiscountModalVisible] = useState(false);
  const [discountingRecord, setDiscountingRecord] = useState(null);

  // State for Search
  const [searchKeywords, setSearchKeywords] = useState({});

  // Initialize Form instances
  const [editPriceForm] = Form.useForm();
  const [editDiscountForm] = Form.useForm();

  // Helper function to extract ID from various formats
  const getId = (doc) => doc._id?.$oid || doc._id || doc.id;

  const MAX_FEATURES = 10;

  // Open Edit Price Modal
  const openEditModal = (record) => {
    console.log("record", record);
    setEditingRecord(record);
    editPriceForm.setFieldsValue({ newPrice: record.price });
    editPriceForm.setFieldsValue({ title: record.title });
    setFeatures(record.feature);
    setIsEditModalVisible(true);
  };

  // Close Edit Price Modal
  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditingRecord(null);
    editPriceForm.resetFields();
    setFeatures([]);
  };

 
  // Handle feature input
  const handleAddFeature = () => {
    const trimmedFeature = featureInput.trim();
    if (trimmedFeature) {
      if (features.includes(trimmedFeature)) {
        setError("This feature has already been added.");
        return;
      }
      if (features.length >= MAX_FEATURES) {
        setError(`You can only add up to ${MAX_FEATURES} features.`);
        return;
      }
      setFeatures([...features, trimmedFeature]);
      setFeatureInput("");
      setError("");
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFeatures(features.filter((feature) => feature !== featureToRemove));
    setError("");
  };

  const handleFeatureKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  // Handle Edit Price Submit
  const handleEditSubmit = async () => {
    try {
      const values = await editPriceForm.validateFields();
      const updatedData = { price: values.newPrice, title: values.title , feature: features };
      await updateTypeOfBatch(editingRecord._id, updatedData); // Ensure _id is correct
      message.success('Data updated successfully!');
      closeEditModal();
      fetchData(); // Refresh table data
    } catch (error) {
      if (error.name !== 'Error') {
        // Validation failed
        console.error('Validation Failed:', error);
      } else {
        // API Error
        console.error('Error updating price:', error);
        message.error('Failed to update price.');
      }
    }
  };

  // Open Discount Modal
  const openDiscountModal = (record) => {
    setDiscountingRecord(record);
    editDiscountForm.setFieldsValue({ newDiscountPercentage: record.discountPercentage || 0 });
    setIsDiscountModalVisible(true);
  };

  // Close Discount Modal
  const closeDiscountModal = () => {
    setIsDiscountModalVisible(false);
    setDiscountingRecord(null);
    editDiscountForm.resetFields();
  };

  // Handle Discount Submit
  const handleDiscountSubmit = async () => {
    try {
      const values = await editDiscountForm.validateFields();
      const updatedData = { discountPercentage: values.newDiscountPercentage };
      await discountTypeOfBatch(discountingRecord._id, updatedData); // Ensure _id is correct
      message.success('Discount Percentage updated successfully!');
      closeDiscountModal();
      fetchData(); // Refresh table data
    } catch (error) {
      if (error.name !== 'Error') {
        // Validation failed
        console.error('Validation Failed:', error);
      } else {
        // API Error
        console.error('Error updating discount percentage:', error);
        message.error('Failed to update discount percentage.');
      }
    }
  };

  // Fetch data from API when contentType changes
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [contentType]);

  const fetchData = async () => {
    try {
      switch (contentType) {
        case 'class':
          // Fetch classes and boards
          const [classesData, boardsData] = await Promise.all([
            getAllClasses(),
            getBoards(),
          ]);

          // Create boardMap to map board IDs to board names
          const boardMap = {};
          boardsData.forEach((board) => {
            const boardId = getId(board);
            boardMap[boardId] = board.name;
          });

          // Enrich classes with board names
          const enrichedClasses = classesData.map((cls) => {
            const boardId = cls.curriculum?.$oid || cls?.curriculum?._id;
            const boardName = boardId ? boardMap[boardId] || 'N/A' : 'N/A';
            return {
              ...cls,
              boardName,
            };
          });

          setData(enrichedClasses);
          break;

        case 'subject':
          // Fetch subjects, classes, and boards concurrently
          const [subjectsData, classesDataForSubjects, boardsDataForSubjects] = await Promise.all([
            getAllSubjects(),
            getAllClasses(),
            getBoards(),
          ]);

          // Create mappings
          const classMap = {};
          classesDataForSubjects.forEach((cls) => {
            const classId = getId(cls);
            classMap[classId] = cls;
          });

          const boardMapForSubjects = {};
          boardsDataForSubjects.forEach((board) => {
            const boardId = getId(board);
            boardMapForSubjects[boardId] = board.name;
          });

          // Enrich subjects with class levels and board names
          const enrichedSubjects = subjectsData.map((subject) => {
            const classId = subject.class_id._id || subject.class_id;
            const classData = classMap[classId];
            const classLevel = classData ? classData.classLevel : 'N/A';

            // Get boardId from classData
            const boardId = classData?.curriculum?.$oid || classData?.curriculum?._id;
            const boardName = boardId ? boardMapForSubjects[boardId] || 'N/A' : 'N/A';

            return {
              ...subject,
              classLevel,
              boardName,
            };
          });

          setData(enrichedSubjects);
          break;

        case 'board':
          const boardData = await getBoards();
          setData(boardData);
          break;

        case 'package':
          const packageData = await getAllPackages();
          setData(packageData);
          break;

        case 'faq':
          const faqData = await getAllFAQ();
          setData(faqData);
          break;

        case 'banner':
          const bannerData = await getBanners();
          setData(bannerData);
          break;

        case 'chooseUs':
          const chooseUsData = await getChooseUsData();
          setData(chooseUsData.features);
          break;

        case 'benefits':
          const benefitData = await getAllBenefits();
          setData(benefitData.benefits);
          break;

        case 'typeOfBatch':
          const typeOfBatchData = await getAllTypeOfBatches();
          const TypeofBatch = typeOfBatchData.map((item) => {
            return {
              ...item,
              subjectName: item?.subject_id?.subject_name || "N/A",
              className: item?.class_id?.classLevel|| "N/A",
              boardName: item?.class_id?.curriculum?.name || "N/A",
              batchType: item?.custom_batch ? "Custom Batch" : "Normal Batch",
            };
          });
          console.log("typeOfBatchData", TypeofBatch);
          setData(TypeofBatch);
          break;

        case 'blog':
          const blogData = await getAllBlogs();
          if (blogData.success && Array.isArray(blogData.data)) {
            setData(blogData.data); // Correctly set to the data array
          } else {
            message.error("Invalid blog data format received.");
          }
          break;

        default:
          setData([]);
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error('Failed to fetch data');
    } finally {
      setLoading(false); // Ensure loading is set to false regardless of success or failure
    }
  };

  // Show Create Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Close Create Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // // Handle Create
  const handleCreate = async (newItem) => {
    try {
      switch (contentType) {
        case 'class':
          await createClass(newItem);
          message.success('Class created successfully');
          break;
        case 'subject':
          await createSubject(newItem);
          message.success('Subject created successfully');
          break;
        case 'board':
          await createBoard(newItem);
          message.success('Board created successfully');
          break;
        case 'package':
          await createPackage(newItem);
          message.success('Package created successfully');
          break;
        case 'faq':
          await createFAQ(newItem);
          message.success('FAQ created successfully');
          break;
        case 'banner':
          await createBanner(newItem);
          message.success('Banner created successfully');
          break;
        case 'chooseUs':
          await createChooseUsFeature(newItem);
          message.success('Choose Us Feature created successfully');
          break;
        case 'benefits':
          await createBenefit(newItem);
          message.success('Benefit created successfully');
          break;
        case 'typeOfBatch':
          await createTypeOfBatch(newItem);
          message.success('Type of Batch created successfully');
          break;
        case 'blog':
          await createBlog(newItem);
          message.success('Blog created successfully');
          break;
        default:
          break;
      }
      setIsModalVisible(false);
      fetchData(); // Refresh data after creation
      setfil
    } catch (error) {
      console.error('API Error:', error);
      message.error('Failed to create item');
    } 
  };

  // const handleCreate = async (newItem) => {
  //   try {
  //     await createSubject(newItem); // Call the API to create the subject
  //     message.success("Subject created successfully");
  //     fetchData(); // Refresh the table data
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     message.error("Failed to create subject");
  //   }
  // };
  

  // Handle Delete
  const handleDelete = async (record) => {
    try {
      switch (contentType) {
        case 'class':
          await deleteClass(getId(record));
          message.success('Class deleted successfully');
          break;
        case 'subject':
          await deleteSubjectById(getId(record));
          message.success('Subject deleted successfully');
          break;
        case 'board':
          await deleteBoard(getId(record));
          message.success('Board deleted successfully');
          break;
        case 'package':
          await deletePackageById(getId(record));
          message.success('Package deleted successfully');
          break;
        case 'faq':
          await deleteFAQ(getId(record));
          message.success('FAQ deleted successfully');
          break;
        case 'banner':
          await deleteBanner(getId(record));
          message.success('Banner deleted successfully');
          break;
        case 'chooseUs':
          await deleteChooseUsFeature(getId(record));
          message.success('Choose Us Feature deleted successfully');
          break;
        case 'benefits':
          await deleteBenefit(getId(record));
          message.success('Benefit deleted successfully');
          break;
        case 'typeOfBatch':
          await deleteTypeOfBatch(getId(record));
          message.success('Type of Batch deleted successfully');
          break;
        case 'blog':
          await deleteBlog(getId(record));
          message.success('Blog deleted successfully');
          break;
        default:
          break;
      }
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
      message.error('Failed to delete item');
    }
  };

  // Define searchable fields per content type
  const searchableFields = {
    class: ['className', 'classLevel'],
    subject: ['subject_name', 'classLevel'],
    board: ['name'],
    package: ['package_name', 'description'],
    faq: ['question'],
    banner: ['banner_name'],
    chooseUs: ['name'],
    benefits: ['title'],
    typeOfBatch: ['mode', 'boardName', 'className', 'subjectName'],
    blog: ['title', 'author', 'tags'],
  };

  // Handle search input changes
  const handleSearchChange = (field, value) => {
    setSearchKeywords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Compute filtered data based on search keywords
  const filteredData = useMemo(() => {
    if (!contentType || !searchableFields[contentType]) {
      return data;
    }

    return data.filter((record) => {
      return searchableFields[contentType].every((field) => {
        if (!searchKeywords[field]) return true; // No search keyword for this field
        const recordValue = record[field];
        if (recordValue === undefined || recordValue === null) return false;
        if (Array.isArray(recordValue)) {
          // For array fields like tags
          return recordValue.some((item) =>
            item.toString().toLowerCase().includes(searchKeywords[field].toLowerCase())
          );
        }
        return recordValue.toString().toLowerCase().includes(searchKeywords[field].toLowerCase());
      });
    });
  }, [data, searchKeywords, contentType]);

  // Define columns, form component, and title based on contentType
  let columns = [];
  let FormComponent = null;
  let title = '';

  switch (contentType) {
    case 'class':
      title = 'Classes';
      columns = [
        {
          title: 'Class Name',
          dataIndex: 'className',
          key: 'className',
        },
        {
          title: 'Class Level',
          dataIndex: 'classLevel',
          key: 'classLevel',
        },
        {
          title: 'Board Name',
          dataIndex: 'boardName',
          key: 'boardName',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this class?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
        },
      ];
      FormComponent = ClassForm;
      break;

    case 'subject':
      title = 'Subjects';
      columns = [
        {
          title: 'Subject Name',
          dataIndex: 'subject_name',
          key: 'subject_name',
        },
        {
          title: 'Class Level',
          dataIndex: 'classLevel',
          key: 'classLevel',
          render(_, record) {
            return <span>{record.classLevel || 'N/A'}</span>;
          },
        },
        {
          title: 'Board Name',
          dataIndex: 'boardName',
          key: 'boardName',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this subject?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
        },
      ];
      FormComponent = SubjectForm;
      break;

    case 'board':
      title = 'Boards';
      columns = [
        {
          title: 'Board Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this board?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
        },
      ];
      FormComponent = BoardForm;
      break;

    case 'package':
      title = 'Packages';
      columns = [
        {
          title: 'Package Name',
          dataIndex: 'package_name',
          key: 'package_name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          render: (text) => `₹${text}`,
        },
        {
          title: 'Features',
          dataIndex: 'features',
          key: 'features',
          render: (text, record) => (
            <ul style={{ paddingLeft: '20px' }}>
              {(record.features || []).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          ),
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (text, record) => (
            <img
              src={record.image}
              alt="Item"
              style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => {
                setSelectedImage(record.image);
                setImageModalVisible(true);
              }}
            />
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this package?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
        },
      ];
      FormComponent = PackageForm;
      break;

    case 'faq':
      title = 'FAQ';
      columns = [
        {
          title: 'Question',
          dataIndex: 'question',
          key: 'question',
        },
        {
          title: 'Answer',
          dataIndex: 'answer',
          key: 'answer',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this FAQ?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
        },
      ];
      FormComponent = FaqForm;
      break;

    case 'banner':
      title = 'Banners';
      columns = [
        {
          title: 'Name',
          dataIndex: 'banner_name',
          key: 'banner_name',
        },
        {
          title: 'Image',
          dataIndex: 'banner_image',
          key: 'banner_image',
          render: (text, record) => (
            <img
              src={record.banner_image}
              alt="Item"
              style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => {
                setSelectedImage(record.banner_image);
                setImageModalVisible(true);
              }}
            />
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this banner?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
        },
      ];
      FormComponent = BannerForm;
      break;

    case 'chooseUs':
      title = 'Choose Us';
      columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Image',
          dataIndex: 'imageUrl',
          key: 'imageUrl',
          render: (text, record) => (
            <img
              src={record.imageUrl}
              alt="Item"
              style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => {
                setSelectedImage(record.imageUrl);
                setImageModalVisible(true);
              }}
            />
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this image?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
        },
      ];
      FormComponent = ChooseUsForm;
      break;

    case 'benefits':
      title = 'Benefits';
      columns = [
        {
          title: 'Name',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: "Colour",
          dataIndex: "color",
          key: "color",
          render: (text, record) => (
            <div style={{ backgroundColor: record.color, width: '50px', height: '50px' }}></div>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this benefit?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
        },
      ];

      FormComponent = BenefitForm;
      break;

    case 'typeOfBatch':
      title = 'Type of Batch';
      columns = [
        {
          title: 'Mode',
          dataIndex: 'mode',
          key: 'mode',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          render: (text) => `₹${text}`,
        },
        {
          title: 'Discount Price',
          dataIndex: 'discountedPrice',
          key: 'discountedPrice',
          render: (text) => text ? `₹${text}` : 'N/A',
        },
        {
          title: 'Board',
          dataIndex: 'boardName',
          key: 'boardName',
        },
        {
          title: 'Class',
          dataIndex: 'className',
          key: 'className',
        },
        {
          title: 'Subject',
          dataIndex: 'subjectName',
          key: 'subjectName',
        },
        {
          title: 'Batch Type',
          dataIndex: 'batchType',
          key: 'batchType',
        },
        {
          title: 'Discount Percentage',
          dataIndex: 'discountPercentage',
          key: 'discountPercentage',
          render: (text) => text !== undefined ? `${text}%` : 'N/A',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <>
              <Button type="link" onClick={() => openEditModal(record)}>
                Edit 
              </Button>
              <Button type="link" onClick={() => openDiscountModal(record)}>
                Edit Discount
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this batch type?"
                onConfirm={() => handleDelete(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger>
                  Delete
                </Button>
              </Popconfirm>
            </>
          ),
        },
      ];
      FormComponent = ModeBatch;
      break;

    case 'blog':
      title = 'Blog';
      columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Author',
          dataIndex: 'author',
          key: 'author',
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (text, record) => (
            <img
              src={record.image}
              alt="Item"
              style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => {
                setSelectedImage(record.image);
                setImageModalVisible(true);
              }}
            />
          ),
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: "Tags",
          dataIndex: "tags",
          key: "tags",
          render: (_, record) => {
            if (Array.isArray(record.tags) && record.tags.length > 0) {
              return (
                <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                  {record.tags.map((tag, idx) => (
                    <li key={`${tag}-${idx}`} style={{ display: 'inline', marginRight: '8px' }}>
                      <Tag color="blue">{tag}</Tag>
                    </li>
                  ))}
                </ul>
              );
            } else {
              return <span>No tags</span>;
            }
          },
        },

        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this blog?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
        },
      ];
      FormComponent = BlogForm;
      break;

    default:
      break;
  }

  // Render search inputs based on contentType
  const renderSearchInputs = () => {
    if (!contentType || !searchableFields[contentType]) return null;

    return (
      <Form layout="vertical" style={{ marginBottom: '20px' }}>
        <Row gutter={16}>
          {searchableFields[contentType].map((field) => {
            let label = '';
            switch (field) {
              case 'className':
                label = 'Class Name';
                break;
              case 'classLevel':
                label = 'Class Level';
                break;
              case 'subject_name':
                label = 'Subject Name';
                break;
              case 'name':
                label = 'Name';
                break;
              case 'package_name':
                label = 'Package Name';
                break;
              case 'description':
                label = 'Description';
                break;
              case 'question':
                label = 'Question';
                break;
              case 'title':
                label = 'Name';
                break;
              case 'author':
                label = 'Author';
                break;
              case 'tags':
                label = 'Tags';
                break;
              case 'mode':
                label = 'Mode';
                break;
              case 'boardName':
                label = 'Board';
                break;
              case 'subjectName':
                label = 'Subject';
                break;
              default:
                label = field;
            }

            return (
              <Col span={8} key={field}>
                <Form.Item label={label} name={field}>
                  <Input
                    placeholder={`Search ${label}`}
                    value={searchKeywords[field] || ''}
                    onChange={(e) => handleSearchChange(field, e.target.value)}
                  />
                </Form.Item>
              </Col>
            );
          })}
        </Row>
      </Form>
    );
  };

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
    <Container>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <Title>{title}</Title>
        <div style={{ textAlign: 'right', marginBottom: '16px' }}>
          <StyledButton icon={<PlusOutlined />} onClick={showModal}>
            Create {title}
          </StyledButton>
        </div>
      </div>
      {/* Search Inputs */}
      {renderSearchInputs()}
      {/* Table */}
      {filteredData.length > 0 ? (
        <Table
          className='anttable'
          columns={columns}
          dataSource={filteredData}
          rowKey={record => getId(record)} // Correctly returns the ID
          pagination={{ pageSize: 10 }} // Optional: Add pagination
          bordered // Optional: Add borders for better visibility
        />
      ) : (
        <Alert message="No data available" type="info" showIcon />
      )}
      {/* Create Modal */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {FormComponent && (
          <FormComponent onSubmit={handleCreate} onClose={handleCancel} />
        )}
      </Modal>

      {/* Edit Price Modal */}
      <Modal
        title="Edit Batch Type Price"
        visible={isEditModalVisible}
        onCancel={closeEditModal}
        footer={null}
      >
        <Form
          form={editPriceForm}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            label="New Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter the title!' },
              // Add additional validation rules if necessary
            ]}
          >
            <Input placeholder="Enter Title" />
          </Form.Item>
          {/* Features */}
          <Form.Item label="Features" >
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={handleFeatureKeyDown}
                placeholder="Enter a feature"
              />
              <Button
                type="primary"
                onClick={handleAddFeature}
                disabled={!featureInput.trim() || features.length >= MAX_FEATURES}
              >
                <FaPlus /> Add
              </Button>
            </div>
            {features.length >= MAX_FEATURES && (
              <Alert message={`You can only add up to ${MAX_FEATURES} features.`} type="warning" />
            )}
            {features.length > 0 && (
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: "4px" }}>
                    {feature}{" "}
                    <Button
                      danger
                      type="text"
                      icon={<FaTrash />}
                      onClick={() => handleRemoveFeature(feature)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </Form.Item>
          <Form.Item
            label="New Price (₹)"
            name="newPrice"
            rules={[
              { required: true, message: 'Please enter a new price!' },
              { type: 'number', min: 0, message: 'Price must be a positive number!' },
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Save Changes
            </Button>
            <Button onClick={closeEditModal} style={{ marginLeft: '8px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Edit Discount Modal */}
      <Modal
        title="Edit Discount Percentage"
        visible={isDiscountModalVisible}
        onCancel={closeDiscountModal}
        footer={null}
      >
        <Form
          form={editDiscountForm}
          layout="vertical"
          onFinish={handleDiscountSubmit}
        >
          <Form.Item
            label="New Discount Percentage (%)"
            name="newDiscountPercentage"
            rules={[
              { required: true, message: 'Please enter a new discount percentage!' },
              { type: 'number', min: 0, max: 100, message: 'Percentage must be between 0 and 100!' },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Save Changes
            </Button>
            <Button onClick={closeDiscountModal} style={{ marginLeft: '8px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Image Modal */}
      <Modal
        visible={imageModalVisible}
        footer={null}
        onCancel={() => setImageModalVisible(false)}
      >
        <img src={selectedImage} alt="Full View" style={{ width: '100%' }} />
      </Modal>
    </Container >

  );

};

export default ManageContentTable;
