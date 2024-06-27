import groq from "groq";

export const ARTICLES_QUERY = groq`*[_type=="article"]`;
export const ARTICLE_QUERY = groq`*[_type=="article" && slug.current == $id]`;
