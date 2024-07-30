import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getArticles(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  try {
    const ARTICLES_QUERY = groq`*[_type=="article" && language==$lang]{_id, slug, title}`;
    const articles = await client.fetch(ARTICLES_QUERY, params);
    return articles;
  } catch (error) {
    throw new Response("ArticlesQuery not found", {
      status: 404,
    });
  }
}
export async function getArticle(params: Params<string>) {
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
  try {
    const ARTICLE_QUERY = groq`*[_type=="article" && slug.current==$id && language==$lang][0]{
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
    const article = await client.fetch(ARTICLE_QUERY, params);
    if (!article) {
      throw new Error("Query did not fetch any data");
    }
    return article;
  } catch (error) {
    throw new Response("ArticleQuery not found", {
      status: 404,
    });
  }
}
