import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { Content } from "sanity/types";
import urlFor from "~/functions/imageUrlBuilder";

interface PortableTextProps {
  textData: Content;
}

export default function PortableTextComponent({ textData }: PortableTextProps) {
  const customComponents = {
    types: {
      customImage: ({
        value,
      }: PortableTextComponentProps<{
        asset: { _ref: string; _type: "reference" };
        alt: string;
      }>) => {
        return (
          <img
            src={urlFor(value.asset?._ref)}
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
