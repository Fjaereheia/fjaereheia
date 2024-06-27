import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import { FRONTPAGE_QUERY } from "~/queries/frontpage-queries";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function getFrontpage() {
  const frontpage = await client.fetch<FRONTPAGE_QUERYResult>(FRONTPAGE_QUERY);
  return frontpage;
}

export async function loader() {
  const frontpage = await getFrontpage();

  if (!frontpage) {
    return json("Forside ikke funnet", { status: 404 });
  }

  return json(frontpage);
}

export default function Index() {
  const data = useLoaderData<typeof loader>() as FRONTPAGE_QUERYResult;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.preamble}</p>
      <img src={data?.imageUrl || ""} />
      <h2>Forestilling: {data?.event?.title}</h2>
      <p>Ingress: {data?.event?.preamble}</p>
      <img src={data?.event?.imageUrl || ""} />
      <div>
        {data?.event?.text?.map((item, index) => (
          <div key={index}>
            {item._type === "block" && item.children ? (
              <p>{item.children.map((child) => child.text).join("")}</p>
            ) : item._type === "image" && item.asset?.url ? (
              <img src={item.asset.url} alt="Sanity Image" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
