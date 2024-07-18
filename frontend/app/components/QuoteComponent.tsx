import Quotes from "/quote.svg";

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
  return (
    <blockquote className="border-none grid grid-flow-row place-items-center text-center">
      <img src={Quotes} alt="" />
      <span className="font-bold text-4xl">{quote.content}</span>
      <span className="not-italic">{quote.source}</span>
      <span className="underline not-italic">{quote.company}</span>
    </blockquote>
  );
}
