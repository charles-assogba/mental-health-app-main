import { ReactNode } from "react";

export interface RouteItem {
  label: string;
  path: string;
  element: ReactNode;
}
