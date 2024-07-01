import groq from "groq";

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language=="nb"]{title, preamble, text, event->{title,preamble ,"imageUrl": image.asset->url, slug , text [] {..., asset-> { _id, url}}} , "imageUrl": image.asset->url}[0]`;
