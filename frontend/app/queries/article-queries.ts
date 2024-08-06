import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "../../sanity/clientConfig";

export function getArticlesQuery(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const ARTICLES_QUERY = groq`*[_type=="article" && language=="${params.lang}"]{_id, slug, title}`;
  return ARTICLES_QUERY;
}

export function getArticleQuery(params: Params<string>) {
  const articleID = params.id;

  try {
    if (!articleID) {
      throw new Response("Event ID is required", { status: 404 });
    }
    if (params.id == "noSlugFound") {
      return "No translation with this slug";
    }
    if (!params.lang) {
      params = { lang: "nb", id: articleID };
    }
  } catch (error) {
    throw new Error("Params not found");
  }
  const ARTICLE_QUERY = groq`*[_type=="article" && slug.current=="${params.id}" && language=="${params.lang}"][0]{
    title, 
    slug, 
    metaTitle, 
    metaDescription, 
    colorCombinationsDay, 
    image, 
    text[]{..., 
      _type=="video" => {
        title, muxVideo{asset->{playbackId}
        }
      }
    }, 
    video{
      title, 
      muxVideo{
        asset->{
          playbackId}
        }
    },
    'event': event->{slug},
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      slug,
      language,
      }
    }`;
  return ARTICLE_QUERY;
}
