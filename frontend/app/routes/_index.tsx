import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { FRONTPAGE_QUERY } from "sanity/queries";
import { FRONTPAGE_QUERYResult } from "sanity/types";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export async function getFrontpage() {
  const title = await client.fetch<FRONTPAGE_QUERYResult>(FRONTPAGE_QUERY)
  console.log(title[1] , typeof title)
  return title[1]
}

export async function loader() {
  const frontpage = await getFrontpage()

  if(!frontpage){
    return json("Frontpage not found", {status: 404});
  }

  return json({title: frontpage.Tittel, ingress: frontpage.Ingress, bilde: frontpage.Bilde})

}

export default function Index() {
  const data = useLoaderData<typeof loader>() as {title: string, ingress: string};
  console.log(data)

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.ingress}</p>
    </div>
  )

}
