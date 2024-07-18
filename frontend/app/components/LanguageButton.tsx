import { json, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getEvents } from "~/queries/event-queries";

/*export const loader: Loaderfunction = async ({params}) => {
  const lang = params.lang || "nb";
  const slug = params.slug;

  const data: Event = await sanityClient.fetch(EVENTS_QUERY, {lang, id:slug})

  if(!data){
    throw new Response("NOT FOUND")
  }
  return json ({data})
}
*/

export default function LanguageButton() {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    setIsEnglish(params.lang === "en");
  }, [params]);

  function setLanguage(lang: "NO" | "EN" | string) {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    let path = url.pathname;

    if (lang === "EN") {
      path = "/en" + path;
      setIsEnglish(true);
    } else {
      path = path.replace("/en", "");
      setIsEnglish(false);
    }

    url.pathname = path;
    window.location.href = url.toString();
  }

  return (
    <div className="absolute top-0 right-0 m-4 text-white">
      <button
        onClick={() => setLanguage("NO")}
        disabled={!isEnglish}
        className="mr-2"
      >
        <span className="w-6 h-6">NO</span>
      </button>
      <span className="mr-2">/</span>
      <button onClick={() => setLanguage("EN")} disabled={isEnglish}>
        <span className="w-6 h-6">EN</span>
      </button>
    </div>
  );
}
