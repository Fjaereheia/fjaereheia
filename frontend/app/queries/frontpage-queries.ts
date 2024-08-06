import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "../../sanity/clientConfig";

export function getFrontpageQuery(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language=="${params.lang}"][0]{
  title, 
  image, 
  language,
  svgTitle, 
  metaTitle, 
  metaDescription, 
  event->{
    title, 
    text, 
    image, 
    slug, 
    metaTitle, 
    metaDescription, 
    svgTitle
    }
  }`;

  return FRONTPAGE_QUERY;
}

export async function getFrontpage(params: Params<string>) {
  const FRONTPAGE_QUERY = getFrontpageQuery(params);
  const frontpage = await client.fetch(FRONTPAGE_QUERY, params);
  return frontpage;
}
