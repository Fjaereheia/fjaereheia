import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getProgramPage(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const PROGRAMPAGE_QUERY = groq`*[_type=="programpage" && language==$lang]{title, text, links[]->{title, slug}}[0]`;
  const programpage = await client.fetch(PROGRAMPAGE_QUERY, params);
  return programpage;
}
