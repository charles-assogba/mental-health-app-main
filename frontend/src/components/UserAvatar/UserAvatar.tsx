import UserAvatarView from "./UserAvatar.view";

export default function UserAvatar({
  src,
  name,
  size,
}: {
  src?: string;
  name: string;
  size: "sm" | "md" | "lg";
}) {
  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  return (
    <UserAvatarView
      src={src}
      name={name}
      size={size}
      sizeClasses={sizeClasses}
    />
  );
}
