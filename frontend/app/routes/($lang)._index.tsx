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
  if (!data) {
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
      content: data.metaDescription ?? "Hjemmesiden til Bruddet i Grimstad",
    },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>() as FRONTPAGE_QUERYResult;
  const { t } = useTranslation();
  const imageUrl = urlFor(
    data?.event?.image?.asset?._ref || data?.image?.asset?._ref || ""
  );
  const SvgUrl = urlFor(
    data?.event?.svgTitle?.asset?._ref || data?.svgTitle?.asset?._ref || ""
  );
  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor("bg-white");
  }, [setColor]);
  const params = useParams();
  const styling = data?.event ? "justify-end mb-6" : "justify-center";

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-[100dvh] w-full"
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: "100dvh",
      }}
      aria-label={
        data?.event?.image?.alt || data?.image?.alt || "Background image"
      }
    >
      <div className="flex flex-col h-[100dvh] w-full overflow-hidden">
        <div className="text-white text-xl mt-10 flex flex-col items-center">
          <Newsletter />
        </div>

        <div className={`flex flex-1 flex-col items-center ${styling} mx-4`}>
          <img
            className="lg:w-1/3"
            src={SvgUrl}
            alt={data?.event?.svgTitle?.alt || data?.svgTitle?.alt || "Logo"}
          />

          <div className="flex flex-row justify-center content-center w-full mt-4">
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
