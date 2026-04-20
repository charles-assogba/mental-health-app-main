import { createContext } from "react";

export type FetchThreadContextType = () => void;

export const FetchThreadContext = createContext<FetchThreadContextType>(
  () => {}
);
