import { Params } from "@remix-run/react";
import groq from "groq";

export function getProgramPageQuery(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const PROGRAMPAGE_QUERY = groq`*[_type=="programpage" && language=="${params.lang}"]{metaTitle, metaDescription, title, text,gif, links[]->{title, slug}}[0]`;

  return PROGRAMPAGE_QUERY;
}

