import groq from "groq";

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage"]{title, preamble, "imageUrl": image.asset->url}[0]`