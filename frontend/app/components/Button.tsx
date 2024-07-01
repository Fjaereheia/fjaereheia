import { Link } from "@remix-run/react";

interface ButtonProps {
  landingPageUrl: string;
  content: string;
}

export default function Button({ landingPageUrl, content }: ButtonProps) {
  return (
    <>
      <Link to={landingPageUrl}>
        <button>{content}</button>
      </Link>
    </>
  );
}
