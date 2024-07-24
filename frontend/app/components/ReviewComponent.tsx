import WhiteQuote from "~/assets/whiteQuote";
import BlackQuote from "~/assets/BlackQuote";
import { useLocation } from "@remix-run/react";

export default function ReviewComponent({
  review,
}: {
  review: {
    score?: number;
    content?: string;
    source?: string;
    company?: string;
    date?: string;
    link?: string;
  };
  textColor?: string;
}) {
  const location = useLocation();
  const isProgramPage =
    location.pathname.includes("/event") ||
    location.pathname.includes("/program");
  const styleBlock = isProgramPage
    ? "border-none grid grid-flow-row place-items-center text-center text-white"
    : "border-none grid grid-flow-row place-items-center text-center text-black";
  const styleLink = isProgramPage
    ? "not-italic text-white"
    : "not-italic text-black";

  return (
    <blockquote className={styleBlock}>
      {isProgramPage ? <WhiteQuote /> : <BlackQuote />}
      <span className="font-bold text-4xl">{review.content}</span>
      <span className="not-italic">{review.source}</span>
      {review.link ? (
        <a href={review.link} className={styleLink}>
          {review.company}
        </a>
      ) : (
        <span className={`underline not-italic`}>{review.company}</span>
      )}
    </blockquote>
  );
}
