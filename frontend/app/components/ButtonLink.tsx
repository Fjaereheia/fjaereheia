import { Link } from "@remix-run/react";

interface ButtonProps {
  url: string;
  buttonText: string;
  styling?: string;
}

export default function Button({ url, buttonText, styling }: ButtonProps) {
  return (
    <Link to={url}>
      <button className={styling}>{buttonText}</button>
    </Link>
  );
}
