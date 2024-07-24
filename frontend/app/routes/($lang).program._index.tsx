import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { PROGRAMPAGE_QUERYResult } from "sanity/types";
import Newsletter from "~/components/Newsletter";
import { getProgramPage } from "~/queries/program-queries";
import { useBackgroundColor } from "~/utils/backgroundColor";
import urlFor from "~/utils/imageUrlBuilder";

export async function loader({ params }: LoaderFunctionArgs) {
  const programPage = await getProgramPage(params);

  if (!programPage) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(programPage);
}

export default function Program() {
  const data = useLoaderData<typeof loader>() as PROGRAMPAGE_QUERYResult;
  const { setColor } = useBackgroundColor();
  const gifUrl = urlFor(data?.gif?.asset?._ref || "");
  useEffect(() => {
    setColor("bg-newsletter");
  }, [setColor]);
  const params = useParams();
  return (
    <div className="min-h-screen flex flex-col items-center text-white relative pb-36">
      <h1 className="text-5xl font-bold mb-12">{data?.title}</h1>
      <div className="flex flex-col items-center font-normal gap-4 text-xl py-12 px-0">
        {data?.gif && (
          <img
            src={gifUrl}
            className="absolute w-2/3 right-[10vw] bottom-[25vh] sm:w-1/3  lg:w-1/4 lg:right-[20vw]  lg:bottom-[10vh]"
            alt={data.gif.alt}
          />
        )}

        {data?.links?.map((link, index) => (
          <Link
            key={index}
            to={
              link.slug?.current
                ? `${params.lang === "en" ? "/en/event/" : "/event/"}${
                    link.slug.current
                  }`
                : ""
            }
            className="z-10"
          >
            <p className="p-4 hover:underline font-serif text-2xl lg:text-4xl">
              {link.title}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-auto flex flex-col items-center text-lg lg:text-xl w-4/5 lg:w-2/3 z-10">
        <Newsletter />
      </div>
    </div>
  );
}
