const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};
const leftPanelVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 },
  },
};
const rightPanelVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 },
  },
};
const formContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};
const formItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};
const inputFocusVariant = {
  focus: { scale: 1.03, transition: { type: "spring", stiffness: 300 } },
};
const buttonHoverTap = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.95 },
};
const errorVariant = {
  hidden: { opacity: 0, y: -10, height: 0 },
  visible: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -5, height: 0, transition: { duration: 0.2 } },
};

const primaryGradient =
  "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700";
const secondaryButton =
  "border-teal-300 text-teal-700 hover:bg-teal-100/50 dark:border-teal-700 dark:text-teal-300 dark:hover:bg-teal-900/30 dark:hover:border-teal-600";
const inputFocusRing =
  "focus-visible:ring-teal-400 dark:focus-visible:ring-teal-500";

export {
  pageTransition,
  leftPanelVariants,
  rightPanelVariants,
  formContainerVariants,
  formItemVariants,
  inputFocusVariant,
  buttonHoverTap,
  errorVariant,
  primaryGradient,
  secondaryButton,
  inputFocusRing,
};
