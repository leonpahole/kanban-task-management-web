import { useMediaQuery } from "react-responsive";

// eslint-disable-next-line no-restricted-imports
import tailwindConfig from "@/../tailwind.config";

// eslint-disable-next-line import/no-extraneous-dependencies
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindConfig);

const breakpoints = fullConfig.theme!.screens! as Record<
  "md" | "sm" | "lg" | "xl",
  string
>;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });

  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  type Key = `is${Capitalize<K>}`;

  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
