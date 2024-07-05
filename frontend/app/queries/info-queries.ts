import groq from "groq";
import { client } from "sanity/clientConfig";

export async function getInfoPage(params: { lang: string }) {
  const INFOPAGE_QUERY = groq`*[_type=="infopage" && language==$lang]{title, text, links[]->{..., slug}}[0]`;
  const infopage = await client.fetch(INFOPAGE_QUERY, params);
  return infopage;
}
