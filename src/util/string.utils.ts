export namespace StringUtils {
  export const isNotBlank = (str: string | null | undefined): boolean => {
    if (!str) {
      return false;
    }

    return str.trim().length > 0;
  };
}
