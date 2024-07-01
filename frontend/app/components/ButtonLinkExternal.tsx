interface BuyTicketsButtonProps {
  link: string;
  content: string;
}

export default function BuyTicketsButton({
  link,
  content,
}: BuyTicketsButtonProps) {
  return (
    <>
      <a href={link} target="_blank">
        <button>{content}</button>
      </a>
    </>
  );
}
