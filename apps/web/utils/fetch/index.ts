const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseInit: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};
export const customFetch = {
  get: async (path: string, init?: Omit<RequestInit, "method">) => {
    return await fetch(baseUrl + path, {
      ...baseInit,
      ...init,
      method: "GET",
      headers: { ...baseInit.headers, ...init?.headers },
    });
  },

  post: async (
    path: string,
    body: { [key: string]: any },
    init?: Omit<RequestInit, "method" | "body">
  ) => {
    return await fetch(baseUrl + path, {
      ...baseInit,
      ...init,
      method: "POST",
      headers: { ...baseInit.headers, ...init?.headers },
      body: JSON.stringify(body),
    });
  },
};
