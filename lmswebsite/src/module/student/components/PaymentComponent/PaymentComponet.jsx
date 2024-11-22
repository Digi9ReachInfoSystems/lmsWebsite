// src/components/PaymentComponent.jsx

import React from 'react';
import axiosInstance from '../../../../config/axiosConfig'; // Adjust the path as needed
import { EnrollButton  }from "./PaymentComponet.style";
const PaymentComponent = ({ studentId, packageId, amount }) => {
  const handlePayment = async () => {
    try {
      // Step 1: Create Order on Backend
      const orderResponse = await axiosInstance.post('/api/payments/create-order', {
        studentId,
        packageId,
        amount,
        description: 'Purchase of Premium Package', // Optional
      });

      const order = orderResponse.data;

      // Step 2: Initialize Razorpay Checkout
      const options = {
        key: 'rzp_test_YW49ucyVtjePLT', // Your Razorpay Key ID
        amount: Number(order.amount), // Amount in paise
        currency: order.currency,
        name: 'Your Education Platform',
        description: order.notes.description,
        image: 'https://your-logo-url.com/logo.png', // Optional: Logo image
        order_id: order.id,
        handler: async function (response) {
          console.log(response);
          // Step 3: Verify Payment on Backend
          try {
            const verificationResponse = await axiosInstance.post('/api/payments/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.data.message === 'Payment verified successfully') {
              alert('Payment Successful!');
              // Optionally, redirect or update UI
            } else {
              alert('Payment Verification Failed!');
            }
          } catch (error) {
            console.error('Payment Verification Error:', error);
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: 'Student Name', // Replace with actual student name
          email: 'student@example.com', // Replace with actual student email
          contact: '9999999999', // Replace with actual contact number
        },
        notes: {
          address: 'Student Address', // Optional
        },
        theme: {
          color: '#3399cc', // Customize the color as needed
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Could not initiate payment. Please try again.');
    }
  };


  return (
    <EnrollButton onClick={handlePayment}>
      Pay Now
    </EnrollButton>

 )
};

export default PaymentComponent;
