import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { LoadingBarRef } from "react-top-loading-bar";

export interface MultiLayoutProps {
  children: ReactNode;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  loader: RefObject<LoadingBarRef | null>;
  isLoading: boolean;
}
