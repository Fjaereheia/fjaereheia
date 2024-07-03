import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/functions/imageUrlBuilder";
import ButtonLink from "~/components/ButtonLink";
import {
  FRONTPAGE_QUERY,
  query,
  queryByType,
} from "~/functions/queryFunctions";

export const meta: MetaFunction = () => {
  return [
    { title: "Fjæreheia" },
    { name: "description", content: "Velkommen til Fjæreheia!" },
  ];
};

export async function loader() {
  const frontpage = await queryByType(FRONTPAGE_QUERY);

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
      <img
        src={urlFor(data?.image?.asset?._ref) || ""}
        alt={data?.image?.alt}
      />
      <br />
      <ButtonLink url="/artikler" buttonText="Artikler (Info)"></ButtonLink>
      <ButtonLink url="/event" buttonText="Program"></ButtonLink>

      {data?.event?.title ? (
        <>
          <h2>Forestilling: {data?.event?.title}</h2>
          <p>Ingress: {data?.event?.preamble}</p>
          <img
            src={urlFor(data?.event?.image?.asset?._ref) || ""}
            alt={data?.event?.image?.alt || ""}
          />
          {data?.event?.text ? (
            <PortableTextComponent textData={data?.event?.text} />
          ) : null}
        </>
      ) : (
        <>
          {data?.text ? <PortableTextComponent textData={data?.text} /> : null}
        </>
      )}
    </div>
  );
}
