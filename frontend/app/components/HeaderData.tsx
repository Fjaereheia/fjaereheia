import { Helmet } from "react-helmet";

interface HeaderDataProps {
  description?: string;
  title?: string;
  lang?: string;
}

export default function HeaderData({
  description,
  title,
  lang,
}: HeaderDataProps) {
  return (
    <Helmet>
      <html lang={lang} />
      <meta charSet="utf-8" />
      <meta name="og:description" content={description} />
      <meta name="og:title" content={title} />
    </Helmet>
  );
}
