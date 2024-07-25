import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getInfoPage(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const INFOPAGE_QUERY = groq`*[_type=="infopage" && language==$lang]{title, links[]->{..., slug}}[0]`;
  const infopage = await client.fetch(INFOPAGE_QUERY, params);
  return infopage;
}
