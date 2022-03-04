type Options = {
  token?: string;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: null;
  method?: string;
};

export const post = async (url: string, body: Object, options?: Options) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      // https://amberley.dev/blog/2020-09-07-conditionally-add-to-array-or-obj/
      ...(options?.token && { authorization: `Bearer ${options?.token}` }),
      ...options?.headers,
    },
    method: options?.method ?? 'POST',
    ...options,
  });

  return res;
};

export const get = async (url: string, options?: Options) => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.token && { authorization: `Bearer ${options?.token}` }),
      ...options?.headers,
    },
    method: options?.method ?? 'GET',
    ...options,
  });

  const data = await res.json();

  return data;
};
