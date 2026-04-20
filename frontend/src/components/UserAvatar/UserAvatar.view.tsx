import { FC } from "react";
import { UserAvatarProps } from "./UserAvatar.type";

const UserAvatarView: FC<UserAvatarProps> = ({
  // src,
  name,
  size = "md",
  sizeClasses,
}) => {
  return (
    <img
      src={
        // src ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=random`
      }
      alt={name}
      className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm`}
    />
  );
};

export default UserAvatarView;
