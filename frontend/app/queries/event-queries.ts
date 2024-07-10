import groq from "groq";

export const EVENTS_QUERY = groq`*[_type=="event"]`;
export const EVENT_QUERY = groq`*[_type=="event" && slug.current ==$id][0]{
...,roleGroups[]{name,roles[]->{name, occupation,image, text}}
}`;
