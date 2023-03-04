/* eslint-disable @next/next/no-html-link-for-pages */
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { Spinner } from "@/components/shared/Spinner";
import { LayoutProvider } from "@/providers/LayoutContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/api/auth/login");
  };

  let content;

  if (isLoading) {
    content = null;
  } else if (error) {
    content = (
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <p className="text-hxl text-red-100">
          Authentication error: {error?.message ?? "Unknown error"}
        </p>
        <a
          className="text-hl font-normal text-purple-100 underline"
          href="/api/auth/login"
        >
          Try logging in again
        </a>
      </div>
    );
  } else if (!user) {
    redirectToLogin();
    content = (
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <Spinner />
        <p className="text-hl font-normal text-gray-medium">Hang on...</p>
      </div>
    );
  } else {
    content = (
      <>
        <Navbar />
        <div className="flex min-h-0 flex-1">
          <Sidebar />
          <main className="flex min-w-0 flex-1 flex-col">{children}</main>
        </div>
      </>
    );
  }

  return (
    <LayoutProvider>
      <div className="flex h-screen flex-col bg-gray-light dark:bg-gray-very-dark">
        {content}
      </div>
    </LayoutProvider>
  );
};
