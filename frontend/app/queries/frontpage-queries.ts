import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "sanity/clientConfig";

export const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language==$lang]{title, image, language,svgTitle, metaTitle, metaDescription, event->{title, text, image, slug, metaTitle, metaDescription, svgTitle}}[0]`;
export async function getFrontpage(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }

  const frontpage = await client.fetch(FRONTPAGE_QUERY, params);
  return frontpage;
}
