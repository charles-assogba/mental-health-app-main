const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 },
  },
};

const iconWrapperVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 12,
      delay: 0.3,
      duration: 0.5,
    },
  },
};

const iconPulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.5,
      delay: 0.6,
    },
  },
};

const contentSwitchVariants = {
  hidden: { opacity: 0, y: 20, position: "absolute" as const, width: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    position: "relative" as const,
    transition: { duration: 0.4, ease: "circOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    position: "absolute" as const,
    width: "100%",
    transition: { duration: 0.3, ease: "circIn" },
  },
};

const textContainerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonHoverTap = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.95 },
};

const iconColorConfirm = "text-teal-600 dark:text-teal-400";
const iconBgConfirm = "bg-teal-100 dark:bg-teal-900/30";
const iconColorInitial = "text-blue-600 dark:text-blue-400";
const iconBgInitial = "bg-blue-100 dark:bg-blue-900/30";
const primaryButtonGradient =
  "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700";
const secondaryButtonBorder =
  "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50";
const inputFocusRing =
  "focus-visible:ring-teal-400 dark:focus-visible:ring-teal-500";

export {
  pageVariants,
  cardVariants,
  iconWrapperVariants,
  iconPulse,
  contentSwitchVariants,
  textContainerStagger,
  textVariants,
  buttonHoverTap,
  iconColorConfirm,
  iconBgConfirm,
  iconColorInitial,
  iconBgInitial,
  primaryButtonGradient,
  secondaryButtonBorder,
  inputFocusRing,
};
