/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Create a UserContext
export const UserContext = createContext();

// Define a UserContextProvider component
export function UserContextProvider({ children }) {
  // Initialize user info with an empty object
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
