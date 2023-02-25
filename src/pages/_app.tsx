import { ThemeProvider } from "@/providers/ThemeContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import { plusJakartaSans } from "@/fonts";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

import "react-toastify/dist/ReactToastify.css";

import "@/styles/globals.css";
import { useEffect } from "react";

export const PageWrapperId = "__page-wrapper__";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.setAppElement("#modals");
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <div className={`font-sans ${plusJakartaSans.variable}`}>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer
          position="bottom-center"
          hideProgressBar
          theme="colored"
          bodyClassName="!font-sans"
        />
      </QueryClientProvider>
    </>
  );
}
