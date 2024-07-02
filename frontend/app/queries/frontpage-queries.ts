import groq from "groq";
import { client } from "sanity/clientConfig";
import { FRONTPAGE_QUERYResult } from "sanity/types";

export async function getFrontpage(params: { lang: string }) {
  const frontpage = (await client.fetch(
    `*[_type=="frontpage" && language=="${params.lang}"]{title, preamble, event->{title,preamble ,"imageUrl": image.asset->url, slug , text [] {..., asset-> { _id, url}}} , "imageUrl": image.asset->url}[0]`
  )) as FRONTPAGE_QUERYResult;
  return frontpage;
}

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language=="nb"]{title, preamble, image, text, event->{title,preamble, text, image}}[0]`;
