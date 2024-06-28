import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import {
  SanityImageCrop,
  SanityImageHotspot,
  internalGroqTypeReferenceTo,
} from "sanity/types";

interface PortableTextProps {
  textData?: Array<
    | {
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?:
          | "normal"
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6"
          | "blockquote";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }
    | {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
        _key: string;
      }
  > | null;
}
export default function PortableTextConverter({ textData }: PortableTextProps) {
  const customComponents = {
    types: {
      image: ({
        value,
      }: PortableTextComponentProps<{
        asset: { _ref: string; url?: string; _type: "reference" };
      }>) => {
        return (
          <img
            src={value.asset.url || ""}
            alt="Image"
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
