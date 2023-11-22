import { AppRouterInstance as discoverType_AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

declare module "next/navigation" {
  export type AppRouterInstance = discoverType_AppRouterInstance;
}
