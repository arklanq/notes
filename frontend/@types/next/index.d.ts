import 'next';

declare module 'next' {
  export interface DefaultSearchParams {
    [key: string]: string | string[] | undefined;
  }

  export type PageProps<
    P extends object | undefined = object | undefined,
    S extends object = object,
  > = (P extends undefined
    ? {
      params?: P;
    }
    : {
      params: P;
    }) & {
    searchParams?: DefaultSearchParams & S;
  };
}
