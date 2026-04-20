const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 20px rgba(139, 92, 246, 0.1)",
    transition: { type: "spring", stiffness: 300 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const gridContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const buttonHoverTap = {
  hover: { scale: 1.05, backgroundColor: "rgba(167, 139, 250, 0.1)" },
  tap: { scale: 0.95 },
};

const labelColor = "text-gray-500 dark:text-gray-400";
const valueColor = "text-gray-800 dark:text-gray-100";
const accentColor = "text-purple-600 dark:text-purple-400";
const editButtonColor =
  "border-purple-300 text-purple-700 hover:bg-purple-100/50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30 dark:hover:border-purple-600";

export {
  cardVariants,
  itemVariants,
  gridContainerVariants,
  buttonHoverTap,
  labelColor,
  valueColor,
  accentColor,
  editButtonColor,
};
