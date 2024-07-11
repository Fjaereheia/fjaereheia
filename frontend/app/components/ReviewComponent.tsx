import Quotes from "/quote.svg";

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
}) {
  console.log(review);
  return (
    <blockquote className="border-none grid grid-flow-row place-items-center text-white text-center">
      <img src={Quotes} alt="" />
      <span className="font-bold text-4xl">{review.content}</span>
      <span className="not-italic">{review.source}</span>
      {review.link ? (
        <a href={review.link} className="not-italic text-white">
          {review.company}
        </a>
      ) : (
        <span className="underline not-italic">{review.company}</span>
      )}
    </blockquote>
  );
}
