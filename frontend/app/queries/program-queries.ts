import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "../../sanity/clientConfig";

export function getProgramPageQuery(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const PROGRAMPAGE_QUERY = groq`*[_type=="programpage" && language=="${params.lang}"]{metaTitle, metaDescription, title, text,gif, links[]->{title, slug}}[0]`;

  return PROGRAMPAGE_QUERY;
}

export async function getProgramPage(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  try {
    const PROGRAMPAGE_QUERY = groq`*[_type=="programpage" && language==$lang]{metaTitle, metaDescription, title, text,gif, links[]->{title, slug}}[0]`;
    const programpage = await client.fetch(PROGRAMPAGE_QUERY, params);
    return programpage;
  } catch (error) {
    throw new Response("ProgramQuery not found", {
      status: 404,
    });
  }
}
