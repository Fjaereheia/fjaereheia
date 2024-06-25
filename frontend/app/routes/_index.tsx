import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import { FRONTPAGE_QUERY } from "~/queries";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export async function getFrontpage() {
  const frontpage = await client.fetch<FRONTPAGE_QUERYResult>(FRONTPAGE_QUERY)
  return frontpage
}

export async function loader() {
  const frontpage = await getFrontpage()

  if(!frontpage){
    return json("Frontpage not found", {status: 404});
  }

  return json({title: frontpage.Tittel, ingress: frontpage.Ingress, bilde: frontpage.imageUrl})
}

export default function Index() {
  const data = useLoaderData<typeof loader>() as {title: string, ingress: string, bilde: string};

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.ingress}</p>
      <img src={data.bilde} />
    </div>
  )
}
