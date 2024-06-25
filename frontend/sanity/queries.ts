import groq from "groq";

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage"]{Tittel, Ingress, Bilde}`