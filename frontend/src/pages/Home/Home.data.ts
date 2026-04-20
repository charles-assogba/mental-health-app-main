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

const heroTextContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6,
    },
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
      delay: 0.3,
    },
  },
};

const pulseVariant = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const featuresGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const featureCardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: {
    y: -8,
    boxShadow: "0 10px 25px rgba(0, 128, 128, 0.1)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const buttonHoverTap = {
  hover: {
    scale: 1.05,
    y: -3,
    transition: { type: "spring", stiffness: 300 },
  },
  tap: { scale: 0.95 },
};

const floatAnimation = {
  y: ["-4px", "4px", "-4px"],
  transition: {
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity,
  },
};

const avatarContainerVariant = {
  visible: { transition: { staggerChildren: 0.08 } },
};
const avatarVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  hover: {
    scale: 1.15,
    zIndex: 10,
    transition: { type: "spring", stiffness: 400 },
  },
};

const vibrantPrimary = "text-teal-600 dark:text-teal-400";
const vibrantPrimaryBg = "bg-teal-600 hover:bg-teal-700 dark:bg-teal-500";
const vibrantPrimaryBgLight = "bg-teal-100/80 dark:bg-teal-900/30";
const vibrantAccent = "text-purple-600 dark:text-purple-400";
const vibrantAccentBgLight = "bg-purple-100/80 dark:bg-purple-900/30";
const vibrantHighlight = "text-amber-500 dark:text-amber-400";
const vibrantHighlightBgLight = "bg-amber-100/80 dark:bg-amber-900/30";

export {
  sectionVariants,
  heroTextContainerVariants,
  fadeUp,
  fadeRight,
  pulseVariant,
  featuresGridVariants,
  featureCardVariant,
  buttonHoverTap,
  floatAnimation,
  avatarContainerVariant,
  avatarVariant,
  vibrantPrimary,
  vibrantPrimaryBg,
  vibrantPrimaryBgLight,
  vibrantAccent,
  vibrantAccentBgLight,
  vibrantHighlight,
  vibrantHighlightBgLight,
};
