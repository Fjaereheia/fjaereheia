import type { MetaFunction } from "@remix-run/node";
import { client } from "clientConfig";
import groq from 'groq'
import { useState } from "react";
import { TITLE_QUERYResult } from "sanity/types";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};



const TITLE_QUERY = groq`*[_type=="frontpage"]{Tittel}`

export async function getTitle() {
  const title = await client.fetch<TITLE_QUERYResult>(TITLE_QUERY)
  console.log(title[1] , typeof title)
  return title[1]
}
export const loader = async () => {
  const title = getTitle()

  return title
};


export default function Index() {
  const [title, setTitle] = useState("")
  getTitle().then(result => setTitle(result.Tittel!))

  return (
    <h1>{title}</h1>
  )

}
