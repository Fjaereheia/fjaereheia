import React, { useRef, useEffect } from "react";
interface MaskProps {
  url: string;
  alt: string;
  bgColor?: string;
}

export default function ImageMask1({ url, alt, bgColor }: MaskProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      context.fillStyle = "#59A1B6";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }, []);
  return (
    <>
      <div className="relative w-full">
        <canvas className="absolute w-full h-44 z-10" ref={canvasRef} />
        <img src={url} alt={alt} className="relative w-full" />
      </div>
    </>
  );
}
