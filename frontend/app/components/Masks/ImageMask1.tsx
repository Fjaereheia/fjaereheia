import ImageMask from "~/assets/imageMask";

interface MaskProps {
  url: string;
  alt: string;
  bgColor?: string;
}

export default function ImageMask1({ url, alt, bgColor }: MaskProps) {
  return (
    <>
      <div className="relative ">
        <ImageMask />
        <img
          src={url}
          alt={alt}
          className="relative "
          style={{
            clipPath: "url(#imageMask)",
            objectFit: "cover",
            width: "450px",
            height: "450px",
          }}
        />
      </div>
    </>
  );
}
