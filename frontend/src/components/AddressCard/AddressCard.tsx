import { FC } from "react";
import { AddressCardProps } from "./AddressCard.type";
import AddressCardView from "./AddressCard.view";

const AddressCard: FC<AddressCardProps> = ({ user }) => {
  return <AddressCardView user={user} />;
};

export default AddressCard;
