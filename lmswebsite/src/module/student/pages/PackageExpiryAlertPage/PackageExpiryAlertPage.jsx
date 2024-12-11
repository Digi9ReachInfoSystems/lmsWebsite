import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Spin, Button, Typography } from "antd"; // Importing Ant Design components
import { getPackageById } from "../../../../api/packagesApi";
import {SubscriptionSuccessWrap} from "./PackageExpiryAlertPage.styles";

const { Title, Text } = Typography;

const PackageExpiryAlertPage = () => {
    const [isLoading, setIsLoading] = useState(false);
  
 
  const navigate = useNavigate();


  const handleExpiryJob = () => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      navigate("/student/"); // Simulate loading before navigating
    }, 1000);
  };

  return (
   
    <SubscriptionSuccessWrap>
      
        <>
          <Title level={2} className="SubscriptionSuccessWrap-title1">
            Subscription Expired!
          </Title>
         
         
          <Button
            type="primary"
            size="large"
            loading={isLoading} // Show spinner when loading
            onClick={handleExpiryJob}
            className="SubscriptionSuccessWrap-btn"
          >
            {isLoading ? "Loading Homepage..." : "Go to Homepage"}
          </Button>
        </>
     
   </SubscriptionSuccessWrap>
  );
};

export default PackageExpiryAlertPage;
