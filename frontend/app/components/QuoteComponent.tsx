import QuoteMarks from "../assets/QuoteMarks";
interface QuoteProps {
  quote: {
    company: string;
    content: string;
    source: string;
    date: string;
  };
  styleBlock?: string;
  styleLink?: string;
  fillColor?: string;
}

export const QuoteComponent: React.FC<QuoteProps> = ({
  quote,
  styleBlock,
  fillColor,
}) => {
  return (
    <blockquote className={styleBlock || ""}>
      <QuoteMarks fillColor={fillColor || "#00000"} />

      <span className="font-bold text-4xl">{quote.content}</span>
      <span className="not-italic">{quote.source}</span>
      <span className="underline not-italic">{quote.company}</span>
    </blockquote>
  );
};
