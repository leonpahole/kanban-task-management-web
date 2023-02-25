import { plusJakartaSans } from "@/fonts";
import { PageWrapperId } from "@/pages/_app";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={`font-sans ${plusJakartaSans.variable}`}
        id={PageWrapperId}
      >
        <Main />
        <div id="modals" />
        <NextScript />
      </body>
    </Html>
  );
}
