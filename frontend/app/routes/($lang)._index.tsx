import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import { getFrontpage } from "~/queries/frontpage-queries";
import ButtonLink from "~/components/ButtonLink";
import urlFor from "~/utils/imageUrlBuilder";
import PurpleDot from "~/assets/PurpleDot";
import GreenButton from "~/assets/GreenButton";
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
    { title: data.event?.metaTitle ?? data.metaTitle ?? "Bruddet" },
    {
      property: "og:description",
      content:
        data.event?.metaDescription ??
        data.metaDescription ??
        "Hjemmesiden til bruddet i Grimstad",
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
      className="bg-cover bg-center h-screen w-full flex flex-col items-center justify-center pt-64 lg:pt-0"
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-label={
        data?.event?.image?.alt || data?.image?.alt || "Background image"
      }
    >
      <Newsletter />
      <h1 className="mx-4 text-center text-white text-5xl lg:text-8xl ">
        {data?.event?.title || data?.title}
      </h1>

      <br />
      <div className="flex w-full flex-row justify-center content-enter ">
        <ButtonLink
          styling="text-white w-48  text-right px-4 py-2 rounded self-center font-serif text-2xl lg:text-4xl "
          url="/info"
          buttonText="Info"
        />
        <div className="mb-4 mt-4 lg:mt-5 mx-1">
          <PurpleDot />
        </div>

        <ButtonLink
          styling="text-white w-48 px-4 py-2 text-left rounded self-center font-serif text-2xl lg:text-4xl "
          url="/event"
          buttonText="Program"
        />
      </div>

      {data?.event && (
        <Link
          to={"/event/" + data?.event?.slug?.current + "#tickets" || "/event"}
        >
          <button className="flex items-center justify-center px-4 pt-20 lg:py-2 "></button>
          <GreenButton text={"Kjøp \nBillett"} />
        </Link>
      )}
    </div>
  );
}
