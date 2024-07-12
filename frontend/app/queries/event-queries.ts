import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getEvents(params: { lang: string }) {
  const EVENTS_QUERY = groq`*[_type=="event" && language==$lang]`;
  const events = await client.fetch(EVENTS_QUERY, params);
  return events;
}

export const EVENT_QUERY = groq`*[_type=="event" && slug.current ==$id][0]{
...,roleGroups[]{name,roles[]->{name, occupation,image, text}}
}`;
