import groq from "groq";

export const ARTICLES_QUERY = groq`*[_type=="article"]`