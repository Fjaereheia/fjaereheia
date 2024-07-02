import { client } from "sanity/clientConfig";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export default function urlFor(source: string | undefined) {
  if (!source) return "";
  return builder.image(source).url();
}
