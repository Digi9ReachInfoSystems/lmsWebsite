
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { getPackages } from '../../../../api/customPackageApi'; // Adjust the path as needed
import { Container } from './CustomPackage.style';

const CustomPackage = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        console.log('Custom Packages fetched successfully:', data);
        if (data && data.packages) {
          setPackages(data.packages);
        } else {
          console.error('Failed to fetch packages');
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        message.error('Failed to fetch packages');
      }
    };

    fetchPackages();
  }, []);

  const handleViewDetails = (record) => {
    setSelectedPackage(record);
    setIsModalVisible(true);
    // Set form fields with package data
    form.setFieldsValue({
      studentName: record.student_id?.user_id?.name || 'N/A',
      email: record.student_id?.user_id?.email || 'N/A',
      phoneNumber: record.student_id?.phone_number || 'N/A',
      class: record.student_id?.class?.classLevel || 'N/A',
      subjects:
        record.subject_id
          ?.map((subject) => subject.subject_name)
          .join(', ') || 'N/A',
      slots: record.slots || 'N/A',
      packagePrice: record.package_price || 0,
      isApproved: record.is_approved ? 'Yes' : 'No',
      isActive: record.is_active ? 'Yes' : 'No',
    //   adminNotes: record.admin_notes || '',
      // Add more fields as needed
    });
  };

  const handleModalClose = () => {
    setSelectedPackage(null);
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Student Name',
      dataIndex: ['student_id', 'user_id', 'name'],
      key: 'studentName',
      render: (text, record) => record.student_id?.user_id?.name || 'N/A',
    },
    {
      title: 'Email',
      dataIndex: ['student_id', 'user_id', 'email'],
      key: 'email',
      render: (text, record) => record.student_id?.user_id?.email || 'N/A',
    },
    {
      title: 'Phone Number',
      dataIndex: ['student_id', 'phone_number'],
      key: 'phoneNumber',
      render: (text, record) => record.student_id?.phone_number || 'N/A',
    },

    {
      title: 'Class',
      dataIndex: ['student_id', 'class'],
      key: 'classLevel',
      render: (text, record) => record.student_id?.class?.classLevel || 'N/A',
    },
    {
      title: 'Subject',
      dataIndex: 'subject_id',
      key: 'subject',
      render: (subjects) => {
        if (Array.isArray(subjects)) {
          return subjects.map((subject) => subject.subject_name).join(', ');
        }
        return '';
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="button" onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Container>
        <h2>Custom Packages</h2>
      <Table
        dataSource={packages}
        columns={columns}
        rowKey={(record) => record._id}
      />

      {/* Details Modal */}
      <Modal
        title="Package Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedPackage && (
          <Form form={form} layout="vertical">
            <Form.Item label="Student Name" name="studentName">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Class" name="class">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Subjects" name="subjects">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Slots" name="slots">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Package Price" name="packagePrice">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Is Approved" name="isApproved">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Is Active" name="isActive">
              <Input disabled />
            </Form.Item>
            {/* <Form.Item label="Admin Notes" name="adminNotes">
              <Input.TextArea rows={4} disabled />
            </Form.Item> */}
            {/* Add more fields as needed */}
          </Form>
        )}
      </Modal>
    </Container>
  );
};

export default CustomPackage;
