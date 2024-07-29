import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getEvents(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  try {
    const EVENTS_QUERY = groq`*[_type=="event" && language==$lang]{_id, slug, title}`;
    const events = await client.fetch(EVENTS_QUERY, params);
    return events;
  } catch (error) {
    throw new Response("EventsQuery not found", {
      status: 404,
    });
  }
}

export async function getEvent(params: Params<string>) {
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
  try {
    const EVENT_QUERY = groq`*[_type=="event" && language==$lang && slug.current==$id][0]{
    title, 
    image,
    imageMask, 
    colorCombinationsNight, 
    dates, 
    text[]{..., _type=="video" => {title, muxVideo{asset->{playbackId}}}},
    eventGenre, 
    "roleGroups": roleGroups[]{
    name,
    persons[]{
      roleTitle,
      person->{name, image, text}}
    },
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    slug,
    language,
    }
  }`;
    const event = await client.fetch(EVENT_QUERY, params);
    if (!event) {
      throw new Error("Query did not fetch data");
    }

    return event;
  } catch (error) {
    throw new Response("EventQuery not found", {
      status: 404,
    });
  }
}
