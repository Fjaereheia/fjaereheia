import groq from "groq";

export const EVENT_QUERY = groq`*[_type="event"]`;
export const EVENTS_QUERY = groq`*[_type=="event" && slug.current == $id]`;
