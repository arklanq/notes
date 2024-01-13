import 'next/navigation';

declare module 'next/navigation' {
  export type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
}
