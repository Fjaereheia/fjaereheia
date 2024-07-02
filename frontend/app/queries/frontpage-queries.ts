import groq from "groq";

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language=="nb"]{title, preamble, text, event->{title,preamble, text, image}}[0]`;
