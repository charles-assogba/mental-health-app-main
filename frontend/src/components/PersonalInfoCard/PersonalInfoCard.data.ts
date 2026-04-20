const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 20px rgba(0, 128, 128, 0.1)",
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
  hover: { scale: 1.05, backgroundColor: "rgba(0, 128, 128, 0.08)" },
  tap: { scale: 0.95 },
};

const labelColor = "text-gray-500 dark:text-gray-400";
const valueColor = "text-gray-800 dark:text-gray-100";
const editButtonColor =
  "border-teal-300 text-teal-700 hover:bg-teal-100/50 dark:border-teal-700 dark:text-teal-300 dark:hover:bg-teal-900/30 dark:hover:border-teal-600";

export {
  cardVariants,
  itemVariants,
  gridContainerVariants,
  buttonHoverTap,
  labelColor,
  valueColor,
  editButtonColor,
};
