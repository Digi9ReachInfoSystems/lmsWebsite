// ManageContentTable.jsx
import React, { useState, useEffect } from 'react';
import { Table, Modal, message, Popconfirm, Spin, Alert, Form, InputNumber, Button } from 'antd';
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
import { getAllClasses, createClass, deleteClass } from '../../../../../api/classApi';
import { getAllSubjects, createSubject, deleteSubjectById } from '../../../../../api/subjectApi';
import { getBoards, createBoard, deleteBoard } from '../../../../../api/boadApi';
import { getAllPackages, createPackage, deletePackageById } from '../../../../../api/packagesApi';
import { getAllFAQ, createFAQ, deleteFAQ } from '../../../../../api/faq';
import { getBanners, createBanner, deleteBanner } from '../../../../../api/bannerApi';
import { createChooseUsFeature, deleteChooseUsFeature, getChooseUsData } from '../../../../../api/chooseUsApi';
import { createBenefit, getAllBenefits, deleteBenefit } from '../../../../../api/benefitsApi';
import { createTypeOfBatch, getAllTypeOfBatches, deleteTypeOfBatch, updateTypeOfBatch } from '../../../../../api/typeOfBatchApi';
import { createBlog, getAllBlogs, deleteBlog } from '../../../../../api/blogApi';
import Animation from "../../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
import { render } from '@fullcalendar/core/preact.js';

const ManageContentTable = ({ contentType }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state

  // State for Discount Modal
  const [isDiscountModalVisible, setIsDiscountModalVisible] = useState(false);
  const [discountingRecord, setDiscountingRecord] = useState(null);
  const [newDiscountPercentage, setNewDiscountPercentage] = useState('');
  // Helper function to extract ID from various formats
  const getId = (doc) => doc._id?.$oid || doc._id || doc.id;

  const openEditModal = (record) => {
    setEditingRecord(record);
    setNewPrice(record.price); // Initialize with current price
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditingRecord(null);
    setNewPrice('');
  };
  const handleEditSubmit = async () => {
    if (!editingRecord) return;

    setIsSubmitting(true);
    try {
      const updatedData = { price: newPrice };
      await updateTypeOfBatch(editingRecord._id, updatedData); // Ensure _id is correct
      message.success('Price updated successfully!');
      closeEditModal();
      fetchData(); // Refresh table data
    } catch (error) {
      console.error('Error updating price:', error);
      message.error('Failed to update price.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Discount Modal
  const openDiscountModal = (record) => {
    setDiscountingRecord(record);
    setNewDiscountPercentage(record.discountPercentage || 0); // Initialize with current discount
    setIsDiscountModalVisible(true);
  };

  // Close Discount Modal
  const closeDiscountModal = () => {
    setIsDiscountModalVisible(false);
    setDiscountingRecord(null);
    setNewDiscountPercentage('');
  };

  // Handle Discount Submit
  const handleDiscountSubmit = async () => {
    if (!discountingRecord) return;

    setIsSubmitting(true);
    try {
      const updatedData = { discountPercentage: newDiscountPercentage };
      // await updateTypeOfBatch(discountingRecord._id, updatedData); // Ensure _id is correct
     await updateTypeOfBatch(discountingRecord._id, {
        discountPercentage: newDiscountPercentage
      })
      message.success('Discount Percentage updated successfully!');
      closeDiscountModal();
      fetchData(); // Refresh table data
    } catch (error) {
      console.error('Error updating discount percentage:', error);
      message.error('Failed to update discount percentage.');
    } finally {
      setIsSubmitting(false);
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
          ////console.log('Fetching benefits');
          const benefitData = await getAllBenefits();
          setData(benefitData.benefits);
          break;

        case 'typeOfBatch':
          const typeOfBatchData = await getAllTypeOfBatches();
          const TypeofBatch = typeOfBatchData.map((item) => {
            return {
              ...item,
              subjectName: item?.subject_id?.subject_name || "N/A",
              className: item?.subject_id?.class_id?.classLevel || "N/A",
              boardName: item?.subject_id?.class_id?.curriculum?.name || "N/A",
              batchType: (item?.custom_batch ? "Custom Batch" : "Normal Batch")
            }
          }

          );
          // console.log("typeOfBatchData", typeOfBatchData);
          setData(TypeofBatch);
          break;

        case 'blog':
          const blogData = await getAllBlogs();
          ////console.log("Blogs fetched successfully", blogData);
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
      message.error('Failed to fetch data');
    } finally {
      setLoading(false); // Moved here to ensure it's always executed
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

  // Handle Create
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
    } catch (error) {
      message.error('Failed to create item');
    }
  };

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
      message.error('Failed to delete item');
    }
  };

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
              <button type="button">Delete</button>
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
          title: 'Class Level', // Changed from 'Class Name' to 'Class Level'
          dataIndex: 'classLevel', // Updated dataIndex to 'classLevel'
          key: 'classLevel',
          render(_, record) {
            return (
              <span>
                {record.classLevel || 'N/A'}
              </span>
            );
          }
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
              <button type="button">Delete</button>
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
              <button type="button">Delete</button>
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
        },
        {
          title: 'Features',
          dataIndex: 'features',
          key: 'features',
          render: (text, record) => (
            <ul>
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
              <button type="button">Delete</button>
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
              <button type="button">Delete</button>
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
              <button type="button">Delete</button>
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
              <button type="button">Delete</button>
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
              <button type="button">Delete</button>
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
        },
        {
          title: 'Discount Price',
          dataIndex: 'discountedPrice',
          key: 'discountedPrice',
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
        // {
        //   title: 'Duration',
        //   dataIndex: 'duration',
        //   key: 'duration',
        // },
        {
          title: 'Discount Percentage',
          dataIndex: 'discountPercentage',
          key: 'discountPercentage',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this batch type?"
              onConfirm={() => {
                handleDelete(record)
              }}
              okText="Yes"
              cancelText="No"
            >
              <button type="button">Delete</button>
            </Popconfirm>
          ),
        },
        {
          title: 'Discount',
          key: 'discount',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to edit this batch type?"
              onConfirm={() => {
                // handleDelete(record) 
                openDiscountModal(record)
              }
              }
              okText="Yes"
              cancelText="No"
            >
              <button type="button">edit</button>
            </Popconfirm>
          ),
        },
        {
          title: 'Edit',
          key: 'edit',
          render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to edit this batch type?"
              onConfirm={() => {
                // handleDelete(record) 
                openEditModal(record)
              }
              }
              okText="Yes"
              cancelText="No"
            >
              <button type="button">edit</button>
            </Popconfirm>
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
        // Inside ManageContentTable.jsx
        {
          title: "Tags",
          dataIndex: "tags",
          key: "tags",
          render: (_, record) => {
            if (Array.isArray(record.tags) && record.tags.length > 0) {
              return (
                <div>
                  {record.tags.map((tag, idx) => (
                    <li color="blue" key={`${tag}-${idx}`}>
                      {tag}
                    </li>
                  ))}
                </div>
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
              <button type="button">Delete</button>
            </Popconfirm>
          ),
        },
      ];
      FormComponent = BlogForm;
      break;

    default:
      break;
  }

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
      {/* Table */}
      {data.length > 0 ? (
        <Table
          className='anttable'
          columns={columns}
          dataSource={data}
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

      {/* Image Modal */}
      <Modal
        visible={imageModalVisible}
        footer={null}
        onCancel={() => setImageModalVisible(false)}
      >
        <img src={selectedImage} alt="Full View" style={{ width: '100%' }} />
      </Modal>

      {/*edit type of batch Price model */}
      <Modal
        title="Edit Batch Type Price"
        visible={isEditModalVisible}
        onCancel={closeEditModal}
        footer={null}

      >
        <Form layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item
            label="New Price (₹)"
            name="newPrice"
            rules={[
              { required: true, message: 'Please enter a new price!' },
              { type: 'number', min: 0, message: 'Price must be a positive number!' },
            ]}
            initialValue={newPrice}
          >
            <InputNumber
              value={newPrice}
              onChange={(value) => setNewPrice(value)}
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
        <Form layout="vertical" onFinish={handleDiscountSubmit}>
          <Form.Item
            label="New Discount Percentage (%)"
            name="newDiscountPercentage"
            rules={[
              { required: true, message: 'Please enter a new discount percentage!' },
              { type: 'number', min: 0, max: 100, message: 'Percentage must be between 0 and 100!' },
            ]}
            initialValue={newDiscountPercentage}
          >
            <InputNumber
              value={newDiscountPercentage}
              onChange={(value) => setNewDiscountPercentage(value)}
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
    </Container >

  );
};

export default ManageContentTable;
