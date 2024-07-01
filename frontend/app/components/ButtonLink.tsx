import { Link } from "@remix-run/react";

interface ButtonProps {
  url: string;
  buttonText: string;
}

export default function Button({ url, buttonText }: ButtonProps) {
  return (
    <>
      <Link to={url}>
        <button>{buttonText}</button>
      </Link>
    </>
  );
}
