import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import { getFrontpage } from "~/queries/frontpage-queries";
import ButtonLink from "~/components/ButtonLink";
import urlFor from "~/functions/imageUrlBuilder";
import PortableTextComponent from "~/components/PortableTextComponent";

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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (typeof data === "string" || !data) {
    return [
      { title: "Bruddet" },
      {
        property: "og:description",
        content: "Hjemmesiden til bruddet i Grimstad",
      },
    ];
  }

  return [
    { title: data.metaTitle ?? "Bruddet" },
    {
      property: "og:description",
      content: data.metaDescription ?? "Hjemmesiden til bruddet i Grimstad",
    },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>() as FRONTPAGE_QUERYResult;

  return (
    <div>
      <h1>{data?.title}</h1>
      <img
        src={urlFor(data?.image?.asset?._ref || "")}
        alt={data?.image?.alt}
      />
      <br />
      <ButtonLink url="/artikler" buttonText="Artikler (Info)"></ButtonLink>
      <ButtonLink url="/event" buttonText="Program"></ButtonLink>

      {data?.event?.title ? (
        <>
          <h2>Forestilling: {data?.event?.title}</h2>
          <img
            src={urlFor(data?.event?.image?.asset?._ref || "")}
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
