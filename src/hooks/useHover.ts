import { useEffect, useState } from "react";

export const useHover = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) {
      return undefined;
    }

    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    ref.addEventListener("mouseover", handleMouseOver);
    ref.addEventListener("mouseout", handleMouseOut);

    return () => {
      ref.removeEventListener("mouseover", handleMouseOver);
      ref.removeEventListener("mouseout", handleMouseOut);
    };
  }, [ref]);

  return { setRef, isHovered };
};
