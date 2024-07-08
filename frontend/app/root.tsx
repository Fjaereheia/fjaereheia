import {
  json,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./styles/app.css";
import StickyFooter from "./components/StickyFooter";
import Header from "./components/Header/Header";
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";
import { LoaderFunction } from "@remix-run/node";

export let handle = {
  i18n: "common",
};
export const loader: LoaderFunction = async ({ request }) => {
  const { pathname, search } = new URL(request.url);
  let locale = await i18next.getLocale(request);

  if (pathname.endsWith("/") && pathname.length > 1) {
    throw redirect(`${pathname.slice(0, -1)}${search}`, 301);
  }
  return { locale };
};

export function Layout({ children }: { children: React.ReactNode }) {
  let { locale } = useLoaderData<typeof loader>();

  let { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <StickyFooter infoUrl="/artikler" programUrl="/event" />
    </>
  );
}
