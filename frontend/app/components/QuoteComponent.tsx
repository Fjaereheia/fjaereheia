import QuoteMarks from "~/assets/QuoteMarks";
import { useLocation } from "@remix-run/react";

export default function QuoteComponent({
  quote,
}: {
  quote: {
    content?: string | undefined;
    source?: string | undefined;
    company?: string | undefined;
    date?: string | undefined;
  };
}) {
  const location = useLocation();
  const isProgramPage =
    location.pathname.includes("/event") ||
    location.pathname.includes("/program");
  const styleBlock = isProgramPage
    ? "border-none grid grid-flow-row place-items-center text-center text-white"
    : "border-none grid grid-flow-row place-items-center text-center text-black";

  return (
    <blockquote className={styleBlock}>
      {isProgramPage ? (
        <QuoteMarks fillColor="#FDF9F9" />
      ) : (
        <QuoteMarks fillColor="#000000" />
      )}
      <span className="font-bold text-4xl">{quote.content}</span>
      <span className="not-italic">{quote.source}</span>
      <span className="underline not-italic">{quote.company}</span>
    </blockquote>
  );
}
