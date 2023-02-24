import { withClientOnly } from "@/components/shared/withClientOnly";
import { useTheme } from "@/providers/ThemeContext";
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = withClientOnly(() => {
  const { isDarkMode } = useTheme();
  return <ClipLoader loading color={isDarkMode ? "white" : "#828FA3"} />;
});

export const CenteredSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
};
