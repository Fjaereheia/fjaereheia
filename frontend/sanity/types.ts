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

export type Review = {
  _id: string;
  _type: "review";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  score?: number;
  content: string;
  source: string;
  company?: string;
  link?: string;
  date?: string;
};

export type ImageMask = "smallImageNotCoveringScreen" | "bigImageCoveringScreen";

export type ColorCombination = "darkBluePrimaryGreenSecondary" | "lightRedPrimaryDarkBlueSecondary";

export type MetaDescription = string;

export type MetaTitle = string;

export type Video = {
  _id: string;
  _type: "video";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  muxVideo: MuxVideo;
};

export type RoleGroups = {
  _type: "roleGroups";
  name: string;
  roles?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "role";
  }>;
};

export type Content = Array<{
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
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt: string;
  _type: "customImage";
  _key: string;
} | {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
  _key: string;
  [internalGroqTypeReferenceTo]?: "video";
} | {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
  _key: string;
  [internalGroqTypeReferenceTo]?: "quote";
} | {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
  _key: string;
  [internalGroqTypeReferenceTo]?: "review";
}>;

export type Quote = {
  _id: string;
  _type: "quote";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  content: string;
  source: string;
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

export type MuxVideo = {
  _type: "mux.video";
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "mux.videoAsset";
  };
};

export type MuxVideoAsset = {
  _type: "mux.videoAsset";
  status?: string;
  assetId?: string;
  playbackId?: string;
  filename?: string;
  thumbTime?: number;
  data?: MuxAssetData;
};

export type MuxAssetData = {
  _type: "mux.assetData";
  resolution_tier?: string;
  upload_id?: string;
  created_at?: string;
  id?: string;
  status?: string;
  max_stored_resolution?: string;
  passthrough?: string;
  encoding_tier?: string;
  master_access?: string;
  aspect_ratio?: string;
  duration?: number;
  max_stored_frame_rate?: number;
  mp4_support?: string;
  max_resolution_tier?: string;
  tracks?: Array<{
    _key: string;
  } & MuxTrack>;
  playback_ids?: Array<{
    _key: string;
  } & MuxPlaybackId>;
  static_renditions?: MuxStaticRenditions;
};

export type MuxStaticRenditions = {
  _type: "mux.staticRenditions";
  status?: string;
  files?: Array<{
    _key: string;
  } & MuxStaticRenditionFile>;
};

export type MuxStaticRenditionFile = {
  _type: "mux.staticRenditionFile";
  ext?: string;
  name?: string;
  width?: number;
  bitrate?: number;
  filesize?: number;
  height?: number;
};

export type MuxPlaybackId = {
  _type: "mux.playbackId";
  id?: string;
  policy?: string;
};

export type MuxTrack = {
  _type: "mux.track";
  id?: string;
  type?: string;
  max_width?: number;
  max_frame_rate?: number;
  duration?: number;
  max_height?: number;
};

export type TranslationMetadata = {
  _id: string;
  _type: "translation.metadata";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  translations?: Array<{
    _key: string;
  } & InternationalizedArrayReferenceValue>;
  schemaTypes?: Array<string>;
  slug?: Slug;
};

export type InternationalizedArrayReferenceValue = {
  _type: "internationalizedArrayReferenceValue";
  value?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "article";
  } | {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "event";
  } | {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "frontpage";
  } | {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "infopage";
  } | {
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
  name: string;
  occupation: string;
  language?: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
  };
  text?: string;
};

export type Infopage = {
  _id: string;
  _type: "infopage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  language?: string;
  text?: Array<{
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
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
    _key: string;
  }>;
  links?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "article";
  } | {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "infopage";
  }>;
};

export type Frontpage = {
  _id: string;
  _type: "frontpage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  language?: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
  };
  text?: Content;
  event?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "event";
  };
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
};

export type Article = {
  _id: string;
  _type: "article";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  language?: string;
  colorCombination?: ColorCombination;
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
    alt: string;
    _type: "customImage";
  };
  video?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "video";
  };
  event?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "event";
  };
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
};

export type Event = {
  _id: string;
  _type: "event";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  language?: string;
  colorCombination?: ColorCombination;
  imageMask?: ImageMask;
  slug?: Slug;
  preamble?: string;
  dates: Array<{
    date: string;
    url: string;
    _key: string;
  }>;
  duration: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
  };
  text?: Content;
  roleGroups?: Array<{
    _key: string;
  } & RoleGroups>;
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
};

export type Document = {
  _type: "reference";
  _ref: string;
  _weak?: boolean;
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
  alt: string;
};

export type Slug = {
  _type: "slug";
  current: string;
  source?: string;
};

export type InternationalizedArrayReference = Array<{
  _key: string;
} & InternationalizedArrayReferenceValue>;

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | Review | ImageMask | ColorCombination | MetaDescription | MetaTitle | Video | RoleGroups | Content | Quote | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | MuxVideo | MuxVideoAsset | MuxAssetData | MuxStaticRenditions | MuxStaticRenditionFile | MuxPlaybackId | MuxTrack | TranslationMetadata | InternationalizedArrayReferenceValue | Role | Infopage | Frontpage | Article | Event | Document | CustomImage | Slug | InternationalizedArrayReference;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ../frontend/app/queries/article-queries.ts
// Variable: ARTICLES_QUERY
// Query: *[_type=="article" && language==$lang]
export type ARTICLES_QUERYResult = Array<{
  _id: string;
  _type: "article";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  language?: string;
  colorCombination?: ColorCombination;
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
    alt: string;
    _type: "customImage";
  };
  video?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "video";
  };
  event?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "event";
  };
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
}>;
// Variable: ARTICLE_QUERY
// Query: *[_type=="article" && slug.current==$id && language==$lang][0]    {..., text[]{..., _type=="video" => {title, muxVideo{asset->{playbackId}}}},     video{title, muxVideo{asset->{playbackId}}},    'event': event->}
export type ARTICLE_QUERYResult = {
  _id: string;
  _type: "article";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  language?: string;
  colorCombination?: ColorCombination;
  slug?: Slug;
  text: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
  } | {
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
  }> | null;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
  };
  video: {
    title: null;
    muxVideo: null;
  } | null;
  event: {
    _id: string;
    _type: "event";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title: string;
    language?: string;
    colorCombination?: ColorCombination;
    imageMask?: ImageMask;
    slug?: Slug;
    preamble?: string;
    dates: Array<{
      date: string;
      url: string;
      _key: string;
    }>;
    duration: string;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "customImage";
    };
    text?: Content;
    roleGroups?: Array<{
      _key: string;
    } & RoleGroups>;
    metaTitle: MetaTitle;
    metaDescription: MetaDescription;
  } | null;
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
} | null;
// Source: ../frontend/app/queries/event-queries.ts
// Variable: EVENTS_QUERY
// Query: *[_type=="event" && language==$lang]
export type EVENTS_QUERYResult = Array<{
  _id: string;
  _type: "event";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  language?: string;
  colorCombination?: ColorCombination;
  imageMask?: ImageMask;
  slug?: Slug;
  preamble?: string;
  dates: Array<{
    date: string;
    url: string;
    _key: string;
  }>;
  duration: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
  };
  text?: Content;
  roleGroups?: Array<{
    _key: string;
  } & RoleGroups>;
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
}>;
// Variable: EVENT_QUERY
// Query: *[_type=="event" && language==$lang && slug.current==$id][0]{  ..., "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{    slug,    language    }, roleGroups[]{name,roles[]->{name, occupation,image, text}}  }
export type EVENT_QUERYResult = {
  _id: string;
  _type: "event";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  language?: string;
  colorCombination?: ColorCombination;
  imageMask?: ImageMask;
  slug?: Slug;
  preamble?: string;
  dates: Array<{
    date: string;
    url: string;
    _key: string;
  }>;
  duration: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
  };
  text?: Content;
  roleGroups: Array<{
    name: string;
    roles: Array<{
      name: string;
      occupation: string;
      image: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "customImage";
      };
      text: string | null;
    }> | null;
  }> | null;
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
  _translations: Array<{
    slug: null;
    language: string | null;
  } | {
    slug: Slug | null;
    language: string | null;
  } | null>;
} | null;
// Source: ../frontend/app/queries/frontpage-queries.ts
// Variable: FRONTPAGE_QUERY
// Query: *[_type=="frontpage" && language==$lang]{title, image, language, metaTitle, metaDescription, text, event->{title, text, image, slug, metaTitle, metaDescription}}[0]
export type FRONTPAGE_QUERYResult = {
  title: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
  };
  language: string | null;
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
  text: Content | null;
  event: {
    title: string;
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
      alt: string;
      _type: "customImage";
    } | null;
    slug: Slug | null;
    metaTitle: MetaTitle;
    metaDescription: MetaDescription;
  } | null;
} | null;
// Source: ../frontend/app/queries/info-queries.ts
// Variable: INFOPAGE_QUERY
// Query: *[_type=="infopage" && language==$lang]{title, text, links[]->{..., slug}}[0]
export type INFOPAGE_QUERYResult = {
  title: string;
  text: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "customImage";
    _key: string;
  } | {
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  links: Array<{
    _id: string;
    _type: "article";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title: string;
    language?: string;
    colorCombination?: ColorCombination;
    slug: Slug | null;
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
      alt: string;
      _type: "customImage";
    };
    video?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "video";
    };
    event?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "event";
    };
    metaTitle: MetaTitle;
    metaDescription: MetaDescription;
  } | {
    _id: string;
    _type: "infopage";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title: string;
    language?: string;
    text?: Array<{
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "customImage";
      _key: string;
    } | {
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    links?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "article";
    } | {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "infopage";
    }>;
    slug: null;
  }> | null;
} | null;
