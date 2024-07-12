import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getArticles(params: { lang: string }) {
  const ARTICLES_QUERY = groq`*[_type=="article" && language==$lang]`;
  const articles = await client.fetch(ARTICLES_QUERY, params);
  return articles;
}

export const ARTICLE_QUERY = groq`*[_type=="article" && slug.current==$id][0]
{..., text[]{..., _type=="video" => {title, muxVideo{asset->{playbackId}}}}, 
video{title, muxVideo{asset->{playbackId}}},
'event': event->}`;
