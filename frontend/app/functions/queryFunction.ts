import groq from "groq";
import { client } from "sanity/clientConfig";
// Queries needed to generate queryResult types
export const ARTICLES_QUERY = groq`*[_type=="article"]`;
export const ARTICLE_QUERY = groq`*[_type=="article" && slug.current == $id]`;
export const EVENTS_QUERY = groq`*[_type=="event"]`;
export const EVENT_QUERY = groq`*[_type=="event" && slug.current == $id]`;
export const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language=="nb"]{title, preamble, image, text, event->{title,preamble, text, image}}[0]`;

// Function to query Sanity
export default function query(
  type: string,
  language: string,
  projection?: Array<string>,
  filter?: string,
  id?: string,
  references?: string,
  sort?: string
) {
  const result = client.fetch(
    `*[_type=="${type}" && language=="${language}" ${
      filter ? ` && ${filter}` : ""
    } ${references ? ` && references(${references})` : ""}]${
      projection ? `{${projection}}` : ""
    }${sort ? `| order(${sort})` : ""}[${id ? id : "0"}]`
  );
  return result;
}
