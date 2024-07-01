import { Link } from "@remix-run/react";

interface ButtonProps {
  landingPageUrl: string;
  content: string;
}

export default function FrontPageButton({
  landingPageUrl,
  content,
}: ButtonProps) {
  return (
    <>
      <Link to={landingPageUrl}>
        <button>{content}</button>
      </Link>
    </>
  );
}
