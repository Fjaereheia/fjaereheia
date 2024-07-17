import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getArticles(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const ARTICLES_QUERY = groq`*[_type=="article" && language==$lang]`;
  const articles = await client.fetch(ARTICLES_QUERY, params);
  return articles;
}
export async function getArticle(params: Params<string>) {
  const articleID = params.id;
  if (!params.lang) {
    params = { lang: "nb", id: articleID };
  }
  const ARTICLE_QUERY = groq`*[_type=="article" && slug.current==$id && language==$lang][0]
    {..., text[]{..., _type=="video" => {title, muxVideo{asset->{playbackId}}}}, 
    video{title, muxVideo{asset->{playbackId}}},
    'event': event->}`;
  const article = await client.fetch(ARTICLE_QUERY, params);
  return article;
}
