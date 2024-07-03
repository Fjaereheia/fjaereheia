import groq from "groq";

export const ARTICLES_QUERY = groq`*[_type=="article"]`;
export const ARTICLE_QUERY = groq`*[_type=="article" && _id=="d714f4ec-7aa8-49ff-a12c-6c986f306ed4"][0]
{..., text[]{..., _type=="video" => {muxVideo{asset->{playbackId}}}}, 
video{asset->{playbackId}},
'event': event->}`;
