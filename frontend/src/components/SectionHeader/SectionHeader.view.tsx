import {
  headerContentVariants,
  fadeUp,
  pulseVariant,
} from "@/pages/About/About.data";
import { motion } from "framer-motion";
import { FC } from "react";
import { SectionHeaderProps } from "./SectionHeader.type";

const SectionHeaderView: FC<SectionHeaderProps> = ({
  icon: Icon,
  badgeText,
  title,
  subtitle,
  className,
  iconColorClass,
  badgeBgClass,
}) => {
  return (
    <motion.div
      variants={headerContentVariants}
      className={`flex flex-col items-center justify-center space-y-4 text-center ${className}`}
    >
      <div className="space-y-6">
        <motion.div
          variants={fadeUp}
          className={`inline-flex items-center rounded-lg ${badgeBgClass} px-4 py-1.5 text-sm font-medium ${iconColorClass} shadow-sm`}
        >
          <motion.div animate="pulse" variants={pulseVariant}>
            {" "}
            <Icon className={`mr-2 h-5 w-5 ${iconColorClass}`} />
          </motion.div>
          <span>{badgeText}</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-gray-900 dark:text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-[750px] text-gray-600 dark:text-gray-300 md:text-xl"
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SectionHeaderView;
