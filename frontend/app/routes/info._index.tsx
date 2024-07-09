import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { INFOPAGE_QUERYResult } from "sanity/types";
import { getInfoPage } from "~/queries/info-queries";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.lang) {
    params = { lang: "nb" };
  }
  const informationPage = await getInfoPage(params as { lang: string });

  if (!informationPage) {
    return json("Kunne ikke hente infoside", { status: 404 });
  }

  return json(informationPage);
}

export default function Info() {
  const data = useLoaderData<typeof loader>() as INFOPAGE_QUERYResult;
  return (
    <div className="flex flex-col items-center text-[#1B1C20] font-serif">
      <h1 className="text-5xl font-bold mb-12">{data?.title}</h1>
      <div className="flex flex-col items-center font-normal gap-4 text-xl pt-12 pr-0 pl-0 pb-12">
        {data?.links?.map((link) => (
          <Link to={`/${link.slug?.current}`}>{link.title || ""}</Link>
        ))}
      </div>
    </div>
  );
}
