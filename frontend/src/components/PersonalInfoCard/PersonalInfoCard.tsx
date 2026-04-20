import { FC } from "react";
import { PersonalInfoCardProps } from "./PersonalInfoCard.type";
import PersonalInfoCardView from "./PersonalInfoCard.view";

const PersonalInfoCard: FC<PersonalInfoCardProps> = ({ userData }) => {
  return <PersonalInfoCardView userData={userData} />;
};

export default PersonalInfoCard;
