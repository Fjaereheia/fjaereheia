import groq from "groq";

export const ARTICLES_QUERY = groq`*[_type=="article"]`;
export const ARTICLE_QUERY = groq`*[_type=="article" && slug.current==$id][0]
{..., text[]{..., _type=="video" => {muxVideo{asset->{playbackId}}}}, 
video{asset->{playbackId}},
'event': event->}`;
