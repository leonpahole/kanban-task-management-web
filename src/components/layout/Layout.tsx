import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { LayoutProvider } from "@/providers/LayoutContext";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <LayoutProvider>
      <div className="flex h-screen flex-col bg-gray-light dark:bg-gray-very-dark">
        <Navbar />
        <div className="flex min-h-0 flex-1">
          <Sidebar />
          <main className="flex min-w-0 flex-1 flex-col">{children}</main>
        </div>
      </div>
    </LayoutProvider>
  );
};
