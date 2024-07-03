/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Footer = {
  _id: string;
  _type: "footer";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  text?: Array<
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
  >;
  links?: Array<{
    href?: string;
    blank?: boolean;
    icon?: {
      name?: "fa-facebook" | "fa-twitter" | "fa-instagram";
    };
    _type: "link";
    _key: string;
  }>;
};

export type Content = Array<
  | {
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
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
      alt?: string;
      _type: "customImage";
      _key: string;
    }
  | {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "quote";
    }
>;

export type Quote = {
  _id: string;
  _type: "quote";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  content?: string;
  source?: string;
  company?: string;
  date?: string;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type TranslationMetadata = {
  _id: string;
  _type: "translation.metadata";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  translations?: Array<
    {
      _key: string;
    } & InternationalizedArrayReferenceValue
  >;
  schemaTypes?: Array<string>;
  slug?: Slug;
};

export type InternationalizedArrayReferenceValue = {
  _type: "internationalizedArrayReferenceValue";
  value?:
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "article";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "event";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "frontpage";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "role";
      };
};

export type Role = {
  _id: string;
  _type: "role";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  language?: string;
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
  text?: Content;
};

export type Frontpage = {
  _id: string;
  _type: "frontpage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  language?: string;
  preamble?: string;
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
  text?: Content;
  event?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "event";
  };
};

export type Article = {
  _id: string;
  _type: "article";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  language?: string;
  slug?: Slug;
  text?: Content;
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
  event?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "event";
  };
};

export type Event = {
  _id: string;
  _type: "event";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  language?: string;
  slug?: Slug;
  preamble?: string;
  dates?: Array<string>;
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
  text?: Content;
  TicketsUrl?: string;
};

export type CustomImage = {
  _type: "customImage";
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type InternationalizedArrayReference = Array<
  {
    _key: string;
  } & InternationalizedArrayReferenceValue
>;

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Footer
  | Content
  | Quote
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | TranslationMetadata
  | InternationalizedArrayReferenceValue
  | Role
  | Frontpage
  | Article
  | Event
  | CustomImage
  | Slug
  | InternationalizedArrayReference;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ../frontend/app/queries/article-queries.ts
// Variable: ARTICLES_QUERY
// Query: *[_type=="article"]
export type ARTICLES_QUERYResult = Array<{
  _id: string;
  _type: "article";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  language?: string;
  slug?: Slug;
  text?: Content;
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
  event?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "event";
  };
}>;
// Variable: ARTICLE_QUERY
// Query: *[_type=="article" && slug.current == $id]
export type ARTICLE_QUERYResult = Array<{
  _id: string;
  _type: "article";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  language?: string;
  slug?: Slug;
  text?: Content;
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
  event?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "event";
  };
}>;
// Source: ../frontend/app/queries/event-queries.ts
// Variable: EVENTS_QUERY
// Query: *[_type=="event"]
export type EVENTS_QUERYResult = Array<{
  _id: string;
  _type: "event";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  language?: string;
  slug?: Slug;
  preamble?: string;
  dates?: Array<string>;
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
  text?: Content;
  TicketsUrl?: string;
}>;
// Variable: EVENT_QUERY
// Query: *[_type=="event" && slug.current == $id]
export type EVENT_QUERYResult = Array<{
  _id: string;
  _type: "event";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  language?: string;
  slug?: Slug;
  preamble?: string;
  dates?: Array<string>;
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
  text?: Content;
  TicketsUrl?: string;
}>;
// Source: ../frontend/app/queries/frontpage-queries.ts
// Variable: FRONTPAGE_QUERY
// Query: *[_type=="frontpage" && language=="nb"]{title, preamble, image, text, event->{title,preamble, text, image}}[0]
export type FRONTPAGE_QUERYResult = {
  title: string | null;
  preamble: string | null;
  image: {
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
  } | null;
  text: Content | null;
  event: {
    title: string | null;
    preamble: string | null;
    text: Content | null;
    image: {
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
    } | null;
  } | null;
} | null;
