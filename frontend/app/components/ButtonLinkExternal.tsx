interface BuyTicketsButtonProps {
  url: string;
  buttonText: string;
}

export default function BuyTicketsButton({
  url,
  buttonText,
}: BuyTicketsButtonProps) {
  return (
    <>
      <a href={url} target="_blank">
        <button>{buttonText}</button>
      </a>
    </>
  );
}
