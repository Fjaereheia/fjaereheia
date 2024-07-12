import MuxPlayer from "@mux/mux-player-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { CustomContent } from "sanity/types";
import urlFor from "~/utils/imageUrlBuilder";
import QuoteComponent from "./QuoteComponent";

interface PortableTextProps {
  textData: CustomContent;
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
            src={urlFor(value.asset._ref)}
            alt={value.alt}
            style={{ maxWidth: "100%" }}
          />
        );
      },
      video: ({
        value,
      }: PortableTextComponentProps<{
        muxVideo: { asset: { playbackId: string } };
        title: string;
      }>) => {
        return value.muxVideo.asset ? (
          <MuxPlayer
            disableCookies={true}
            playbackId={value.muxVideo.asset.playbackId}
            metadata={value.title ? { video_title: value.title } : undefined}
          />
        ) : null;
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
