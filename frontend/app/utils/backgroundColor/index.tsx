import { createContext, useContext, useState } from "react";

interface backgroundcolorProps {
  color: string;
  children: React.ReactElement;
}

interface BackgroundColorContextType {
  color: string;
  setColor: (color: string) => void;
}

const defaultContext: BackgroundColorContextType = {
  color: "bg-newsletter",
  setColor: () => {},
};

const BackgroundColorContext = createContext<
  BackgroundColorContextType | undefined
>(defaultContext);

export function BackgroundColorProvider({
  color,
  children,
}: backgroundcolorProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>(color);
  return (
    <BackgroundColorContext.Provider
      value={{ color: color, setColor: setBackgroundColor }}
    >
      {children}
    </BackgroundColorContext.Provider>
  );
}

export function useBackgroundColor(color?: string) {
  const colorGlobal = useContext(BackgroundColorContext);
  if (!colorGlobal) {
    throw new Error("Please wrap ypu application in a BackgroundColorProvider");
  }
  if (color) {
    colorGlobal.setColor(color);
  }

  return colorGlobal;
}
