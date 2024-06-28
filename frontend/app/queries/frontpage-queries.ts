import groq from "groq";

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage"]{title, preamble, event->{title,preamble , _key, "imageUrl": image.asset->url, slug , _key, text [] {..., _key, _type == "imageAsset" => asset-> {..., _ref, _type, url}}} , "imageUrl": image.asset->url}[0]`;
