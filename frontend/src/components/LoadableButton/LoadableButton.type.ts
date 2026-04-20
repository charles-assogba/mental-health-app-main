import { ReactNode } from "react";
import { ButtonProps } from "./LoadableButton";

export interface LoadableButtonProps {
  isLoading?: boolean;
  children: ReactNode;
  props?: ButtonProps;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}
 