import { Layout } from "@/components/layout/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Your kanban board</title>
      </Head>
      <Layout>
        <div className="h-100 flex flex-1 items-center justify-center">
          <h2 className="text-bl text-gray-medium">
            Select or add the board on the right.
          </h2>
        </div>
      </Layout>
    </>
  );
}
