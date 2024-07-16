import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextInterface {
  textColor: string;
  setTextColor: (color: string) => void;
}

const AppContext = createContext<AppContextInterface | undefined>({
  textColor: "white",
  setTextColor: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [textColor, setTextColor] = useState<string>("black");

  return (
    <AppContext.Provider value={{ textColor, setTextColor }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
