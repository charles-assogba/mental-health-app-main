const pageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "circOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "circIn" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 },
  },
};

const successIconVariants = {
  hidden: { scale: 0, rotate: -90, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 10,
      delay: 0.4,
      duration: 0.6,
    },
  },
};

const confettiVariants = {
  initial: { opacity: 0, y: -20, scale: 0.5 },
  animate: () => ({
    opacity: [0.7, 0],
    y: [0, 80],
    x: Math.random() * 80 - 40,
    scale: Math.random() * 0.5 + 0.5,
    rotate: Math.random() * 360,
    transition: {
      delay: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 1.5 + 1,
      ease: "easeOut",
      repeat: 0,
    },
  }),
};

const textContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const buttonHoverTap = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.95 },
};

const iconColor = "text-emerald-600 dark:text-emerald-400";
const iconBg = "bg-emerald-100 dark:bg-emerald-900/30";
const primaryButtonGradient =
  "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700";

const confettiColors = [
  "bg-teal-400",
  "bg-cyan-400",
  "bg-purple-400",
  "bg-amber-400",
  "bg-pink-400",
];

export {
  pageVariants,
  cardVariants,
  successIconVariants,
  confettiVariants,
  textContainerVariants,
  textVariants,
  buttonHoverTap,
  iconColor,
  iconBg,
  primaryButtonGradient,
  confettiColors,
};
