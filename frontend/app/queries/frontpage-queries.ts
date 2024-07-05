import groq from "groq";
import { client } from "sanity/clientConfig";
import { FRONTPAGE_QUERYResult } from "sanity/types";

export async function getFrontpage(params: { lang: string }) {
  const frontpage = (await client.fetch(
    `*[_type=="frontpage" && language=="${params.lang}"]{title, text, image, metaTitle, metaDescription, event->{title, text, image, slug}}[0]`
  )) as FRONTPAGE_QUERYResult;
  return frontpage;
}

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language=="nb"]{title, image, language, metaTitle, metaDescription, text, event->{title, text, image, slug}}[0]`;
