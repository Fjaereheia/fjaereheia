import { createContext, useContext, useState, useEffect } from "react";

interface BackgroundColorProps {
  color: string;
  children: React.ReactNode;
}

interface BackgroundColorContextType {
  color: string;
  setColor: (color: string) => void;
}

const defaultContext: BackgroundColorContextType = {
  color: "bg-white",
  setColor: () => {},
};

const BackgroundColorContext =
  createContext<BackgroundColorContextType>(defaultContext);

export function BackgroundColorProvider({
  color,
  children,
}: BackgroundColorProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>(color);

  return (
    <BackgroundColorContext.Provider
      value={{ color: backgroundColor, setColor: setBackgroundColor }}
    >
      {children}
    </BackgroundColorContext.Provider>
  );
}

export function useBackgroundColor(newColor?: string) {
  const context = useContext(BackgroundColorContext);
  if (!context) {
    throw new Error(
      "Please wrap your application in a BackgroundColorProvider"
    );
  }

  useEffect(() => {
    if (newColor) {
      context.setColor(newColor);
    }
  }, [newColor]);
  console.log(context.color);

  return context;
}
