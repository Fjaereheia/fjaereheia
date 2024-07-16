import { createContext, useContext, useState, useEffect } from "react";
import { backgroundColour } from "../pageTransition";

interface BackgroundColorProps {
  color: string;
  setColor: (color: string) => void;
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
  setColor,
  children,
}: BackgroundColorProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>(color);

  useEffect(() => {
    console.log("Index useEffect: " + backgroundColor);
    setColor(backgroundColor);
  }, [backgroundColor]);
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
  console.log("index: " + context.color);

  if (!context) {
    throw new Error(
      "Please wrap your application in a BackgroundColorProvider"
    );
  }

  useEffect(() => {
    if (newColor) {
      context.setColor(newColor);
    }
  }, [context.color]);

  return context;
}
