import { Layout } from "@/components/layout/Layout";
import Head from "next/head";

export default function BoardView() {
  return (
    <>
      <Head>
        <title>{} | Your kanban board</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <Layout>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </Layout>
    </>
  );
}
