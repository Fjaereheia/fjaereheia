import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import { FRONTPAGE_QUERY } from "~/queries/frontpage-queries";
import PortableTextComponent from "~/components/PortableTextComponent";

export const meta: MetaFunction = () => {
  return [
    { title: "Fjæreheia" },
    { name: "description", content: "Velkommen til Fjæreheia!" },
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
  console.log(data);

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.preamble}</p>
      <img src={data?.imageUrl || ""} />
      <br />
      <Link to="/artikler">
        <button>Articles</button>
      </Link>
      {data?.event?.title ? (
        <>
          <h2>Forestilling: {data?.event?.title}</h2>
          <p>Ingress: {data?.event?.preamble}</p>
          <img src={data?.event?.imageUrl || ""} />
          <PortableTextComponent textData={data.event.text} />
        </>
      ) : (
        <p> no content available</p>
      )}
    </div>
  );
}
