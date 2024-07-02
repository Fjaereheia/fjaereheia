import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getFrontpage(params: { lang: string }) {
  const frontpage = await client.fetch(
    `*[_type=="frontpage" && language=="${params.lang}"]{title, preamble, text, image, event->{title,preamble, text, image}}[0]`
  );
  return frontpage;
}

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language=="nb"]{title, preamble, image, text, event->{title,preamble, text, image}}[0]`;
