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
    <div className="flex flex-col items-center mx-6 mt-">
      <h1 className="text-4xl">{data?.title}</h1>
      <div className="flex flex-col items-center mx-6 mt-">
        {data?.links?.map((link) => (
          <Link to={`/${link.slug?.current}`}>{link.title || ""}</Link>
        ))}
      </div>
    </div>
  );
}
