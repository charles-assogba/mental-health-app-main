const userData = {
  name: "Alex Johnson",
  email: "alex.j@example.com",
  phone: "+1 555 987 6543",
  bio: "Mindfulness explorer & aspiring writer.",
  gender: "Lainnya",
};

const addressData = {
  street: "Jl. Ketenangan No. 123",
  city: "Bandung",
  province: "Jawa Barat",
  zipCode: "40115",
  country: "Indonesia",
};

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

const sectionStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  hover: {
    y: -4,
    boxShadow: "0 8px 25px rgba(0, 128, 128, 0.08)",
    transition: { type: "spring", stiffness: 300 },
  },
};

const gridContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const gridItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const buttonHoverTap = {
  hover: { scale: 1.05, backgroundColor: "rgba(0, 128, 128, 0.08)" },
  tap: { scale: 0.95 },
};

const labelColor = "text-gray-500 dark:text-gray-400";
const valueColor = "text-gray-800 dark:text-gray-100";
const iconColor = "text-teal-600 dark:text-teal-400";
const accentColor = "text-purple-600 dark:text-purple-400";
const editButtonColor =
  "border-teal-300 text-teal-700 hover:bg-teal-100/50 dark:border-teal-700 dark:text-teal-300 dark:hover:bg-teal-900/30 dark:hover:border-teal-600";

const dangerColor =
  "text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20";

export {
  userData,
  addressData,
  pageVariants,
  sectionStagger,
  cardFadeUp,
  gridContainerVariants,
  gridItemVariants,
  buttonHoverTap,
  labelColor,
  valueColor,
  iconColor,
  accentColor,
  editButtonColor,
  dangerColor,
};
