import { Params } from "@remix-run/react";
import groq from "groq";

export function getEventsQuery (params: Params<string>){
  const EVENTS_QUERY = groq`*[_type=="event" && language=="${params.lang}"]{_id, slug, title}`;
  return EVENTS_QUERY;
}

export function getEventQuery(params: Params<string>) {
  const eventId = params.id;
  try {
    if (!eventId) {
      throw new Response("Event ID is required", { status: 404 });
    }

    if (eventId == "noSlugFound") {
      return "No translation with this slug";
    }

    if (!params.lang) {
      params = { lang: "nb", id: eventId };
    }
  } catch (error) {
    throw new Error("Params not found");
  }
  const EVENT_QUERY = groq`*[_type=="event" && language=="${params.lang}" && slug.current=="${params.id}"][0]{
    metaTitle,
    metaDescription,
    title, 
    image,
    imageMask, 
    colorCombinationsNight, 
    dates, 
    labels,
    text[]{..., _type=="video" => {title, muxVideo{asset->{playbackId}}}},
    eventGenre, 
    roleGroups[]{
      name, 
      persons[]{
      occupation, 
      person->{name, image, text}
      }
    },
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    slug,
    language,
    }
  }`;

  return EVENT_QUERY;
}
