const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.15,
    },
  },
};

const headerContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, duration: 0.6 },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, duration: 0.7 },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 0.7,
      delay: 0.1,
    },
  },
};

const pulseVariant = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardHover = {
  hover: {
    y: -8,
    boxShadow: "0 10px 25px rgba(0, 128, 128, 0.1)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const teamMemberHover = {
  hover: {
    scale: 1.03,
    transition: { type: "spring", stiffness: 300 },
  },
};

const timelineItemHover = {
  hover: {},
};

const timelineDotHover = {
  hover: {
    scale: 1.3,
    transition: { type: "spring", stiffness: 400 },
  },
};

const buttonHoverTap = {
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
  tap: { scale: 0.95 },
};

const iconHover = {
  hover: { scale: 1.15, transition: { type: "spring", stiffness: 400 } },
};

const vibrantPrimary = "text-teal-600 dark:text-teal-400";
const vibrantPrimaryBg = "bg-teal-600 dark:bg-teal-500";
const vibrantPrimaryBgLight = "bg-teal-100/80 dark:bg-teal-900/30";
const vibrantAccent = "text-orange-500 dark:text-orange-400";
const vibrantAccentBg = "bg-orange-500 dark:bg-orange-500";
const vibrantAccentBgLight = "bg-orange-100/80 dark:bg-orange-900/30";
const purpleColor = "text-purple-600 dark:text-purple-400";
const purpleBgLight = "bg-purple-100/80 dark:bg-purple-900/30";

export {
  sectionVariants,
  headerContentVariants,
  fadeUp,
  fadeLeft,
  fadeRight,
  pulseVariant,
  gridContainerVariants,
  cardHover,
  teamMemberHover,
  timelineItemHover,
  timelineDotHover,
  buttonHoverTap,
  iconHover,
  vibrantPrimary,
  vibrantPrimaryBg,
  vibrantPrimaryBgLight,
  vibrantAccent,
  vibrantAccentBg,
  vibrantAccentBgLight,
  purpleColor,
  purpleBgLight,
};
