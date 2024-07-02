import groq from "groq";

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language=="nb"]{title, preamble, image, text, event->{title,preamble, text, image}}[0]`;
