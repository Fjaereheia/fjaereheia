import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import { getFrontpage } from "~/queries/frontpage-queries";
import ButtonLink from "~/components/ButtonLink";

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
      <img src={data?.imageUrl || ""} />
      <br />
      <ButtonLink url="/artikler" buttonText="Artikler (Info)"></ButtonLink>
      <ButtonLink url="/event" buttonText="Program"></ButtonLink>

      {data?.event?.title ? (
        <>
          <h2>Forestilling: {data?.event?.title}</h2>
          <p>Ingress: {data?.event?.preamble}</p>
          <img src={data?.event?.imageUrl || ""} />
          <div>
            {data?.event?.text?.map((item, index) => (
              <div key={index}>
                {item._type === "block" && item.children ? (
                  <p>{item.children.map((child) => child.text).join("")}</p>
                ) : item._type === "customImage" && item.asset?.url ? (
                  <img src={item.asset.url} alt="Sanity Image" />
                ) : null}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p> no content available</p>
      )}
    </div>
  );
}
