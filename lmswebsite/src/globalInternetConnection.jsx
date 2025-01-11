import { useState, useEffect } from "react";
import { notification } from "antd";

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const showOfflineNotification = () => {
      notification.error({
        message: "No Internet Connection",
        description: "You are offline. Please check your internet connection.",
        duration: 0, // Keep the notification open until dismissed
      });
    };

    const showOnlineNotification = () => {
      notification.success({
        message: "Back Online",
        description: "Your internet connection has been restored.",
        duration: 2,
      });
    };

    const handleOnline = () => {
      setIsOnline(true);
      showOnlineNotification();
    };

    const handleOffline = () => {
      setIsOnline(false);
      showOfflineNotification();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
