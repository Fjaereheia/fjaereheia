import { createContext, useContext, useState, useEffect } from "react";

interface BackgroundColorContextData {
  color: string;
  bgImage: string;
  bodyStyle: React.CSSProperties;
  setColor: (newColor: string) => void;
  setbgImage: (imageUrl: string) => void;
}

export const BackgroundColorContext = createContext<BackgroundColorContextData>(
  {
    color: "bg-white",
    bgImage: "",
    bodyStyle: {},
    setColor: () => {},
    setbgImage: () => {},
  }
);

export interface BackgroundColorProviderProps {
  children: React.ReactNode;
}

export function BackgroundColorProvider({
  children,
}: BackgroundColorProviderProps) {
  const [color, setColor] = useState<string>("bg-strongblue");
  const [bgImage, setbgImage] = useState<string>("");
  const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    document.body.className = color + " h-full flex flex-col grow";
  }, [color]);

  useEffect(() => {
    // Fungerer ikke på mobil?
    const newBodyStyle: React.CSSProperties = {
      background: bgImage ? `url(${bgImage})` : "",
      backgroundRepeat: "no-repeat",
      WebkitBackgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    };
    setBodyStyle(newBodyStyle);
    Object.assign(document.body.style, newBodyStyle);
    return () => {
      Object.assign(document.body.style, {
        background: "",
        backgroundRepeat: "",
        backgroundPosition: "",
        backgroundAttachment: "",
      });
    };
  }, [bgImage]);
  return (
    <BackgroundColorContext.Provider
      value={{ color, bgImage, bodyStyle, setColor, setbgImage }}
    >
      {children}
    </BackgroundColorContext.Provider>
  );
}

export function useBackgroundColor() {
  return useContext(BackgroundColorContext);
}
