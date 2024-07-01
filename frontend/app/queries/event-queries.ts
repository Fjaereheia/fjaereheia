import groq from "groq";

export const EVENTS_QUERY = groq`*[_type=="event"]`; //radio button show in program or not?
export const EVENT_QUERY = groq`*[_type=="event" && slug.current == $id]`;
