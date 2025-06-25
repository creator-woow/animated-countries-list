import { API_URL } from 'shared/config';
import { cleanObject } from 'shared/lib';

export interface ListFetchResponse<T> {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
}

interface CustomFetchOptions extends RequestInit {
  // Field of object will be added as query params for request
  query?: Record<string, unknown>;
  // Fields of object replace url segments where substring has format :<field_name>
  params?: Record<string, unknown>;
}

type CustomFetchResponse<TData = unknown, TErrorBody = unknown> =
  | {
      ok: true;
      data: TData;
      error?: never;
    }
  | {
      ok: false;
      data?: never;
      error: Partial<TErrorBody>;
    };

export const customFetch = {
  async _createRequest<TResponse = unknown, TErrorBody = unknown>(
    url: string,
    options?: CustomFetchOptions,
  ): Promise<CustomFetchResponse<TResponse, TErrorBody>> {
    const isCustomOrigin = url.startsWith('https://');

    let processedUrl = url;
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        const placeholder = `:${key}`;
        processedUrl = processedUrl.replace(placeholder, String(value));
      });
    }

    const headers = new Headers({
      ...options?.headers,
      ...(!(options?.body instanceof FormData) && {
        'Content-Type': 'application/json',
      }),
    });

    const cleanedQuery = options?.query ? cleanObject(options.query) : {};

    const searchParams = new URLSearchParams(
      cleanedQuery as Record<string, string>,
    ).toString();

    const res = await fetch(
      `${isCustomOrigin ? '' : API_URL}${processedUrl}${
        searchParams
          ? (processedUrl.includes('?') ? '&' : '?') + searchParams
          : ''
      }`,
      {
        ...options,
        headers,
      },
    );

    const bodyText = (await res.text()) || JSON.stringify(null);

    if (!res.ok) {
      return {
        ok: false,
        error: JSON.parse(bodyText),
      };
    }

    return {
      ok: true,
      data: JSON.parse(bodyText),
    };
  },

  POST<TResponse, TError = unknown>(url: string, options?: CustomFetchOptions) {
    return customFetch._createRequest<TResponse, TError>(url, {
      ...options,
      method: 'POST',
    });
  },

  GET<TResponse, TError = unknown>(url: string, options?: CustomFetchOptions) {
    return customFetch._createRequest<TResponse, TError>(url, {
      ...options,
      method: 'GET',
    });
  },

  PATCH<TResponse, TError = unknown>(
    url: string,
    options?: CustomFetchOptions,
  ) {
    return customFetch._createRequest<TResponse, TError>(url, {
      ...options,
      method: 'PATCH',
    });
  },

  DELETE<TResponse, TError = unknown>(
    url: string,
    options?: CustomFetchOptions,
  ) {
    return customFetch._createRequest<TResponse, TError>(url, {
      ...options,
      method: 'DELETE',
    });
  },
};
