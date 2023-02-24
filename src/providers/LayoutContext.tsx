import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface LayoutContextType {
  isSidebarOpen: boolean;
  showSidebar(): void;
  hideSidebar(): void;
}

export const LayoutContext = createContext<LayoutContextType>({} as any);

interface IProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: IProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const showSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const hideSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const value = useMemo(
    (): LayoutContextType => ({
      isSidebarOpen,
      showSidebar,
      hideSidebar,
    }),
    [hideSidebar, isSidebarOpen, showSidebar]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const layout = useContext(LayoutContext);
  return layout;
};
