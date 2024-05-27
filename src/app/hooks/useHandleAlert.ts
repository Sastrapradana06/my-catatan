import { useState } from "react";

export default function useHandleAlert() {
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    message: "",
  });

  const handleAlert = (type: string, message: string) => {
    setAlertStatus(true);
    setAlertData({ type, message });

    setTimeout(() => {
      setAlertStatus(false);
    }, 1500);
  };

  return { alertStatus, alertData, handleAlert };
}
