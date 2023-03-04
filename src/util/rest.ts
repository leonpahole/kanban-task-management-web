export namespace Rest {
  export const get = async <T>(path: string): Promise<T> => {
    const response = await fetch(path);
    return processResponse(response);
  };

  export const post = async <T>(path: string, body: any): Promise<T> => {
    return requestWithBody(path, body, "POST");
  };

  export const patch = async <T>(path: string, body: any): Promise<T> => {
    return requestWithBody(path, body, "PATCH");
  };

  export const del = async (path: string) => {
    const response = await fetch(path, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  };

  const requestWithBody = async <T>(
    path: string,
    body: any,
    method: string
  ): Promise<T> => {
    const response = await fetch(path, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return processResponse(response);
  };

  const processResponse = <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };
}
