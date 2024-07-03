import MuxPlayer from "@mux/mux-player-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { Content } from "sanity/types";
import urlFor from "~/utils/imageUrlBuilder";

interface PortableTextProps {
  textData: any;
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
      video: ({
        value,
      }: PortableTextComponentProps<{
        muxVideo: { asset: { playbackId: string } };
        title: string;
      }>) => {
        console.log(value);
        return (
          <MuxPlayer
            playbackId={value.muxVideo.asset?.playbackId}
            metadata={value?.title ? { video_title: value.title } : undefined}
          />
        );
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
