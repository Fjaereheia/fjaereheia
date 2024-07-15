import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getFrontpage(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language==$lang]{title, image, language, metaTitle, metaDescription, text, event->{title, text, image, slug, metaTitle, metaDescription}}[0]`;
  const frontpage = await client.fetch(FRONTPAGE_QUERY, params);
  return frontpage;
}
