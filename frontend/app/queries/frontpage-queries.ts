import groq from "groq";

export const FRONTPAGE_QUERY = groq`
  *[_type == "frontpage"]{
    title,
    preamble,
    event->{
      title,
      preamble,
      _key,
      "imageUrl": image.asset->url,
      "caption": image.caption,
      slug,
      text[]{
        ...,
        _key,
        _type == "image" => {
          ...,
          asset->{
            _ref,
            _type,
            url
          },
          caption
        },
        _type == "reference" => {
          _ref,
          _type
        },
        _type == "block" => {
          ...,
          children[] {
            ...,
            _type == "span" => {
              marks,
              text,
              _type,
              _key
            }
          }
        }
      }
    },
    "imageUrl": image.asset->url,
    "caption": image.caption
  }[3]
`;
