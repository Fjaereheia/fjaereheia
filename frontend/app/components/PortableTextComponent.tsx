import MuxPlayer from "@mux/mux-player-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import {
  SanityImageCrop,
  SanityImageHotspot,
  internalGroqTypeReferenceTo,
} from "sanity/types";
import urlFor from "~/utils/imageUrlBuilder";

interface PortableTextProps {
  textData: Array<
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
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
        alt?: string;
        _type: "customImage";
      }
    | {
        muxVideo: {
          asset: {
            playbackId: string;
          };
        };
        _type: "video";
        _key: string;
      }
    | {
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?:
          | "blockquote"
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6"
          | "normal";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
      }
  > | null;
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
