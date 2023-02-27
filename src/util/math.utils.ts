export namespace MathUtils {
  export const parseNumber = (
    num: string | null | undefined
  ): number | null => {
    if (num == null) {
      return null;
    }

    const parsed = Number(num);
    if (parsed == null || Number.isNaN(parsed)) {
      return null;
    }

    return parsed;
  };

  export const stringToColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let colour = "#";

    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += `00${value.toString(16)}`.substr(-2);
    }

    return colour;
  };
}
