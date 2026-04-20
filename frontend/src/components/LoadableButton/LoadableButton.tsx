import LoadableButtonView from "./LoadableButton.view";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children?: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export default function LoadableButton({
  isLoading,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <LoadableButtonView
      {...props}
      variant={variant}
      isLoading={isLoading}
      children={children}
    />
  );
}
