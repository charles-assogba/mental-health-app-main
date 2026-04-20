export interface SizeClasses {
  sm: string;
  md: string;
  lg: string;
}

export interface UserAvatarProps {
  src: string | undefined;
  name: string;
  size: "sm" | "md" | "lg";
  sizeClasses: SizeClasses;
}
