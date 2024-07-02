import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { Content } from "sanity/types";

interface PortabelTextProps {
  textData: Content;
}

export default function PortableTextComponent({ textData }: PortabelTextProps) {
  const customComponents = {
    types: {
      image: ({
        value,
      }: PortableTextComponentProps<{
        asset: { url: string };
        alt: string;
      }>) => {
        return (
          <img
            src={value.asset.url}
            alt={value.alt}
            style={{ maxWidth: "100%" }}
          />
        );
      },
    },
  };

  return (
    <div>
      {textData && (
        <PortableText value={textData} components={customComponents} />
      )}
    </div>
  );
}
