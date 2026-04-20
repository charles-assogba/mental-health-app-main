import { FC } from "react";
import { SectionHeaderProps } from "./SectionHeader.type";
import SectionHeaderView from "./SectionHeader.view";

const SectionHeader: FC<SectionHeaderProps> = ({
  icon,
  badgeText,
  title,
  subtitle,
  className = "",
  iconColorClass = "text-primary",
  badgeBgClass = "bg-primary/10",
}) => {
  return (
    <SectionHeaderView
      icon={icon}
      badgeText={badgeText}
      title={title}
      subtitle={subtitle}
      className={className}
      iconColorClass={iconColorClass}
      badgeBgClass={badgeBgClass}
    />
  );
};

export default SectionHeader;
