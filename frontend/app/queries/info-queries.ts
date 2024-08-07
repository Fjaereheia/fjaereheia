import { Params } from "@remix-run/react";
import groq from "groq";

export function getInfoPageQuery(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const INFOPAGE_QUERY = groq`*[_type=="infopage" && language=="${params.lang}"]{title, metaTitle, metaDescription, links[]->{_type, title, slug}}[0]`;
  return INFOPAGE_QUERY;
}
