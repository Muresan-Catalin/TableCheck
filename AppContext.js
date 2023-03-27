import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [availability, setAvailability] = useState(0);

  return (
    <AppContext.Provider value={{ availability, setAvailability }}>
      {children}
    </AppContext.Provider>
  );
};
