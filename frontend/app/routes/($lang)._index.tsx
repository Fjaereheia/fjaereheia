import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import { getFrontpage } from "~/queries/frontpage-queries";
import ButtonLink from "~/components/ButtonLink";
import urlFor from "~/functions/imageUrlBuilder";
import PortableTextComponent from "~/components/PortableTextComponent";

export const meta: MetaFunction = () => {
  return [
    { title: "Fjæreheia" },
    { name: "description", content: "Velkommen til Fjæreheia!" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const frontpage = await getFrontpage(params as { lang: string });
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
