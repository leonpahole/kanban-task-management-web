import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-very-dark">
      <Sidebar
        boards={[
          { id: 1, name: "Product roadmap" },
          { id: 2, name: "Product roadmap 2" },
          { id: 3, name: "Product roadmap 3" },
          { id: 4, name: "Product roadmap 4" },
        ]}
      />
      <div className="w-px bg-lines-light dark:bg-lines-dark" />
      <div className="flex flex-1 flex-col">
        <Navbar selectedBoard={{ id: 1, name: "Product roadmap" }} />
        <div className="h-px bg-lines-light dark:bg-lines-dark" />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
