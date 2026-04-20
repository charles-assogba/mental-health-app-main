import { Link } from "react-router-dom";
import UserAvatar from "../UserAvatar/UserAvatar";
import { FC } from "react";
import { ActiveUserCardProps } from "./ActiveUserCard.type";

const ActiveUserCardView: FC<ActiveUserCardProps> = ({ user }) => {
  return (
    <Link to={`/profile/${user.id}`}>
      <div className="flex space-x-3">
        <section>
          <UserAvatar name={user.name} size="sm" />
        </section>

        <section className="flex flex-col space-y-1">
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-gray-700 dark:text-gray-200 text-sm">
            {user._count.thread_comments} respon
          </p>
        </section>
      </div>
    </Link>
  );
};

export default ActiveUserCardView;
