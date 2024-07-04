import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getFrontpage(params: { lang: string }) {
  const frontpage = await client.fetch(
    `*[_type=="frontpage" && language=="${params.lang}"]{title, text, image, event->{title, text, image}}[0]`
  );
  return frontpage;
}

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language=="nb"]{title, image, text, event->{title, text, image}}[0]`;
