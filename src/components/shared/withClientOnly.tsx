import { useEffect, useState } from "react";

export const withClientOnly = (Component: React.FC) => () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <Component />;
};