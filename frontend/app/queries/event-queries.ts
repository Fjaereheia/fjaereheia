import { Params } from "@remix-run/react";
import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getEvents(params: Params<string>) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const EVENTS_QUERY = groq`*[_type=="event" && language==$lang]`;
  const events = await client.fetch(EVENTS_QUERY, params);
  return events;
}

export async function getEvent(params: Params<string>) {
  const eventId = params.id;
  if (!params.lang) {
    params = { lang: "nb", id: eventId };
  }
  if (params.id == "noSlugFound") {
    return "No translation with this slug";
  }
  const EVENT_QUERY = groq`*[_type=="event" && language==$lang && slug.current==$id][0]{
  ...,roleGroups[]{name,roles[]->{name, occupation,image, text}},
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    slug,
    language,
    }
  }`;
  const event = await client.fetch(EVENT_QUERY, params);
  return event;
}
