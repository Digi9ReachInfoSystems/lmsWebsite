import React from "react";
import {
  SuccessContainer,
  SuccessMessage,
  PackageName,
  Button,
} from "./SubscriptionSuccess.style";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getPackageById } from "../../../../api/packagesApi";


const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get("packageId");
  const status = searchParams.get("status");
  const [packageName, setPackageName] = React.useState("");
  useEffect(() => {
    if (packageId) {
      const apiCaller = async () => {
        try {
          const response = await getPackageById(packageId);
          setPackageName(response.package_name);
        } catch (err) {
          console.error("Error fetching Packages:", err);
        }
      }
      apiCaller();
    }
  }, [])

  return (
    <SuccessContainer>
      <SuccessMessage>Subscription Successful!</SuccessMessage>
      {
        status === "approved" ?
          <PackageName>
            You have successfully subscribed to the your CustomPackage package.
          </PackageName>
          :
          <PackageName>
            You have successfully subscribed to the "{packageName}" package.
          </PackageName>
      }

      <Button>Go to Dashboard</Button>
    </SuccessContainer>
  );
};

export default SubscriptionSuccess;
