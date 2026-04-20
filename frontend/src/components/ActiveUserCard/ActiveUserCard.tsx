import { FC } from "react";
import { ActiveUserCardProps } from "./ActiveUserCard.type";
import ActiveUserCardView from "./ActiveUserCard.view";

const ActiveUserCard: FC<ActiveUserCardProps> = ({ user }) => {
  return <ActiveUserCardView user={user} />;
};

export default ActiveUserCard;
