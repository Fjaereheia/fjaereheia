import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, Link, useLocation, useParams } from "@remix-run/react";
import { FRONTPAGE_QUERYResult } from "sanity/types";
import { getFrontpage } from "~/queries/frontpage-queries";
import urlFor from "~/utils/imageUrlBuilder";
import PurpleDot from "~/assets/PurpleDot";
import GreenButton from "~/assets/GreenButton";
import Newsletter from "~/components/Newsletter";
import { createTexts, useTranslation } from "~/utils/i18n";
import { useBackgroundColor } from "~/utils/backgroundColor";
import { useEffect } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  const frontpage = await getFrontpage(params);

  if (!frontpage) {
    throw new Response("Not Found", {
      status: 404,
    });
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
  const { t } = useTranslation();
  const imageUrl = urlFor(
    data?.event?.image?.asset?._ref || data?.image?.asset?._ref || ""
  );
  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor("bg-white");
  }, [setColor]);
  const params = useParams();
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen w-full"
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: "100vh",
      }}
      aria-label={
        data?.event?.image?.alt || data?.image?.alt || "Background image"
      }
    >
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <div className="text-white text-xl mt-10 flex flex-col items-center">
          <Newsletter />
        </div>

        <div className="mt-auto">
          <h1 className="flex flex-col mx-4 text-center text-white text-5xl lg:text-8xl ">
            {data?.event?.title || data?.title}
          </h1>

          <div className="flex flex-row justify-center content-center  w-full">
            <Link to={params.lang == "en" ? "/en/info" : "/info"}>
              <button
                className="text-white w-48  text-right px-4 py-2 rounded self-center font-serif text-2xl lg:text-4xl"
                aria-label="Info"
              >
                Info
              </button>
            </Link>
            <div className="mb-4 mt-4 lg:mt-5 mx-1">
              <PurpleDot />
            </div>
            <Link to={params.lang == "en" ? "/en/program" : "/program"}>
              <button
                className="text-white w-48 px-4 py-2 text-left rounded self-center font-serif text-2xl lg:text-4xl"
                aria-label={t(texts.programText)}
              >
                {t(texts.programText)}
              </button>
            </Link>
          </div>

          {data?.event && (
            <div className="flex justify-center content-center mb-4">
              <Link
                to={
                  "/event/" + data?.event?.slug?.current + "#tickets" ||
                  "/event"
                }
              >
                <button aria-label={t(texts.buyTicket)}></button>
                <GreenButton text={t(texts.buyTicket)} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const texts = createTexts({
  programText: {
    nb: "Program",
    en: "Program",
  },
  buyTicket: {
    nb: "Kjøp \nBillett",
    en: "Buy \nTicket",
  },
});
