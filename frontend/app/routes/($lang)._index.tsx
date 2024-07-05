import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import { getFrontpage } from "~/queries/frontpage-queries";
import ButtonLink from "~/components/ButtonLink";
import urlFor from "~/utils/imageUrlBuilder";
import PortableTextComponent from "~/components/PortableTextComponent";
import Newsletter from "~/components/Newsletter";

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
        content: "Hjemmesiden til Bruddet i Grimstad",
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
  const imageUrl = urlFor(
    data?.event?.image?.asset?._ref || data?.image?.asset?._ref || ""
  );
  return (
    <div
      className="bg-cover bg-center h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-label={
        data?.event?.image?.alt || data?.image?.alt || "Background image"
      }
    >
      <Newsletter />
      <h1 className="text-white text-8xl">
        {data?.event?.title || data?.title}
      </h1>

      <br />
      <div className="flex flex-row justify-center ">
        <ButtonLink url="/artikler" buttonText="Info"></ButtonLink>
        <img className="mb-4 mt-3 mx-1" src="/Vector.png" />
        <ButtonLink url="/event" buttonText="Program"></ButtonLink>
      </div>
    </div>
  );
}
