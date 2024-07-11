import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { Content, Quote } from "sanity/types";
import urlFor from "~/utils/imageUrlBuilder";
import QuoteComponent from "./QuoteComponent";
import ReviewComponent from "./ReviewComponent";

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
      quote: ({
        value,
      }: PortableTextComponentProps<{
        company: string;
        content: string;
        source: string;
        date: string;
      }>) => {
        return <QuoteComponent quote={value} />;
      },
      review: ({
        value,
      }: PortableTextComponentProps<{
        score?: number;
        content?: string;
        source?: string;
        date?: string;
        link?: string;
      }>) => {
        return <ReviewComponent review={value} />;
      },
    },
  };

  return (
    <div className="prose">
      {textData && (
        <PortableText value={textData} components={customComponents} />
      )}
    </div>
  );
}
