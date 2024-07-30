import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getFrontpage(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language==$lang][0]{
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
  const frontpage = await client.fetch(FRONTPAGE_QUERY, params);
  return frontpage;
}
