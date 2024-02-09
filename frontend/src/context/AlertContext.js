import { createContext, useState } from 'react';

export const AlertContext = createContext();
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const addAlert = (message, type) => {
    const newAlert = {
      id: Math.random().toString(36).substring(7),
      message,
      type,
    };
    setAlerts([...alerts, newAlert]);
    setTimeout(() => removeAlert(newAlert.id), 3000);
  }
  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  }
  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  )
}