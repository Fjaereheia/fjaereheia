import { createContext, useContext, useState, ReactNode } from "react";

type BackgroundColorContextType = {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

const BackgroundColorContext = createContext<
  BackgroundColorContextType | undefined
>(undefined);

export const BackgroundColorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [backgroundColor, setBackgroundColor] = useState("white");

  return (
    <BackgroundColorContext.Provider
      value={{ backgroundColor, setBackgroundColor }}
    >
      {children}
    </BackgroundColorContext.Provider>
  );
};

export const useBackgroundColor = () => {
  const context = useContext(BackgroundColorContext);
  if (context === undefined) {
    throw new Error(
      "useBackgroundColor must be used within a BackgroundColorProvider"
    );
  }
  return context;
};
