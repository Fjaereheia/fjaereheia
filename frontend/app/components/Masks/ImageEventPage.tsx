import ImageMask2 from "~/assets/ImageMask2";

interface MaskProps {
  url: string;
  alt: string;
  scale: number;
}

export default function ImageEventPage({ url, alt, scale = 1 }: MaskProps) {
  return (
    <>
      <div className="flex flex-col  justify-center pt-3  items-center w-full">
        <ImageMask2 scaleProp={scale || 1} widthSvg={253} heightSvg={299} />
        <img
          src={url}
          alt={alt}
          style={{
            clipPath: "url(#imageMask)",
            objectFit: "cover",
            width: `${253 * scale}px`,
            height: `${299 * scale}px`,
          }}
        />
      </div>
    </>
  );
}
