import {
  internalGroqTypeReferenceTo,
  SanityImageHotspot,
  SanityImageCrop,
  ColorCombination,
  Slug,
  MetaTitle,
  MetaDescription,
} from "./types";

declare module "sanity/types" {
  export type CustomContent = Array<
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
        title: string;
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
  >;

  // Variable: ARTICLE_QUERY
  // Query: *[_type=="article" && slug.current==$id][0]{..., text[]{..., _type=="video" => {title, muxVideo{asset->{playbackId}}}}, video{title, muxVideo{asset->{playbackId}}},'event': event->}
  export type Custom_ARTICLE_QUERYResult = {
    _id: string;
    _type: "article";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    language?: string;
    colorCombination?: ColorCombination;
    slug?: Slug;
    text?: CustomContent;
    image?: {
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
    };
    video: {
      muxVideo: {
        asset: {
          playbackId: string;
        };
      };
      _type: "video";
      _key: string;
      title: string;
    } | null;
    event: {
      _id: string;
      _type: "event";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      title?: string;
      language?: string;
      colorCombination?: ColorCombination;
      slug?: Slug;
      preamble?: string;
      dates?: Array<{
        date?: string;
        url?: string;
        _key: string;
      }>;
      duration?: string;
      image?: {
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
      };
      text?: CustomContent;
      metaTitle?: MetaTitle;
      metaDescription?: MetaDescription;
    } | null;
    metaTitle?: MetaTitle;
    metaDescription?: MetaDescription;
  } | null;
}
