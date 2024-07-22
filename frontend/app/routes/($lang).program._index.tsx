import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useLocation, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { PROGRAMPAGE_QUERYResult } from "sanity/types";
import Newsletter from "~/components/Newsletter";
import { getProgramPage } from "~/queries/program-queries";
import { useBackgroundColor } from "~/utils/backgroundColor";

export async function loader({ params }: LoaderFunctionArgs) {
  const programPage = await getProgramPage(params);

  if (!programPage) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(programPage);
}

function RedirectType(type: string) {
  if (type == "article") {
    return "/artikler";
  } else if (type == "event") {
    return "/event";
  } else {
    return "";
  }
}

export default function Program() {
  const data = useLoaderData<typeof loader>() as PROGRAMPAGE_QUERYResult;
  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor("bg-newsletter");
  }, [setColor]);
  const params = useParams();
  return (
    <div className="min-h-screen flex flex-col items-center text-white relative pb-36">
      <h1 className="text-5xl font-bold mb-12">{data?.title}</h1>
      <div className="flex flex-col items-center font-normal gap-4 text-xl pt-12 pr-0 pl-0 pb-12">
        {data?.links?.map((link, index) => (
          <Link
            key={index}
            to={link.slug?.current ? "/event/" + link.slug.current : ""}
          >
            <p className="p-4 hover:underline font-serif text-2xl lg:text-4xl">
              {link.title}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-auto flex flex-col items-center text-lg lg:text-xl w-4/5 lg:w-2/3">
        <Newsletter />
      </div>
    </div>
  );
}
