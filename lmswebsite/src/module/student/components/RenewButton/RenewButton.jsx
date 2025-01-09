// src/components/PaymentComponent.jsx

import React from 'react';
import axiosInstance from '../../../../config/axiosConfig'; // Adjust the path as needed
import { EnrollButton  }from "./RenewButton.styles.js";
import { getStudentById } from '../../../../api/studentApi';
import { useNavigate } from 'react-router-dom';
import { razorPayKeys } from '../../../../config/razorpayConfig';
const RenewButton = ({ studentId, amount,batchId,subjectId,duration }) => {
    console.log("prpos", studentId, amount,batchId,subjectId,duration)
  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      // Step 1: Create Order on Backend
      const orderResponse = await axiosInstance.post('/api/payments/create-order-renewal', {
        studentId,
        amount,
        description: 'Purchase of Premium Package 124', // Optional
        batchId,
        subjectId,
        duration
      });
      const studentData= await getStudentById(studentId);
      const order = orderResponse.data;
      console.log("order",order);

      // Step 2: Initialize Razorpay Checkout
      const options = {
        key: razorPayKeys.key_id, // Your Razorpay Key ID
        amount: Number(order.amount), // Amount in paise
        currency: order.currency,
        name: razorPayKeys.name,
        description: order.notes.description,
        image: razorPayKeys.logo, // Optional: Logo image
        order_id: order.id,
        handler: async function (response) {
          console.log(response);
          // Step 3: Verify Payment on Backend
          try {
            // const verificationResponse = await axiosInstance.post('/api/payments/verify-payment', {
            //   razorpay_order_id: response.razorpay_order_id,
            //   razorpay_payment_id: response.razorpay_payment_id,
            //   razorpay_signature: response.razorpay_signature,
            // });

            // if (verificationResponse.data.message === 'Payment verified successfully') {
              alert('Payment Successful!');
              // Optionally, redirect or update UI
              navigate('/student/package/paymentSucces');
            // } else {
            //   alert('Payment Verification Failed!');
            // }
          } catch (error) {
            //console.error('Payment Verification Error:', error);
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: studentData.user_id.name, // Replace with actual student name
          email: studentData.user_id.email, // Replace with actual student email
          contact: studentData.phone_number, // Replace with actual contact number
        },
        notes: {
          address: 'Student Address', // Optional
          batchId: batchId, // Replace with actual batch ID
          subjectId: subjectId, // Replace with actual subject ID
          duration: duration, // Replace with actual duration
        },
        theme: {
          color: '#3399cc', // Customize the color as needed
        },
      };
      console.log("options",options);

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      console.log("rzp1",rzp1);
     
      rzp1.on('payment.failed', function (response){
            console.log(response);
            alert("This step of Payment Failed");
      });
      
    } catch (error) {
      //console.error('Error initiating payment:', error);
      alert('Could not initiate payment. Please try again.');
    }
  };


  return (
    <EnrollButton onClick={handlePayment}>
      Pay Now
    </EnrollButton>

 )
};

export default RenewButton;
