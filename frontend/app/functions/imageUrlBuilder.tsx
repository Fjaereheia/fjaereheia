import { client } from "sanity/clientConfig";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export default function urlFor(source: string) {
  return builder.image(source).url();
}
