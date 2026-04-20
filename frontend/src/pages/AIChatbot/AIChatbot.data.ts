export const pageLoadVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const sidebarVariant = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.4, ease: "circOut" },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { type: "tween", duration: 0.3, ease: "circIn" },
  },
};

export const mobileOverlayVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const suggestionsContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

export const suggestionChipVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  hover: {
    scale: 1.08,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.95 },
};

export const messageVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 250, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export const botMessageSpecific = {
  hidden: { ...messageVariant.hidden, x: -20 },
  visible: { ...messageVariant.visible, x: 0 },
  exit: { ...messageVariant.exit, x: -20 },
};

export const userMessageSpecific = {
  hidden: { ...messageVariant.hidden, x: 20 },
  visible: { ...messageVariant.visible, x: 0 },
  exit: { ...messageVariant.exit, x: 20 },
};

export const typingIndicatorVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export const sendButtonHoverTap = {
  hover: { scale: 1.1, y: -1, transition: { type: "spring", stiffness: 400 } },
  tap: { scale: 0.9 },
};

export const listStagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

export const listItemFade = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  hover: {
    backgroundColor: "rgba(0, 128, 128, 0.08)",
    transition: { duration: 0.15 },
  },
  tap: { scale: 0.98 },
};

export const userBubbleColor = "bg-teal-600 dark:bg-teal-500 text-white";
export const botBubbleColor =
  "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100";
export const suggestionChipColor =
  "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60";
export const sendButtonGradient =
  "bg-gradient-to-r from-teal-500 via-purple-500 to-teal-600 hover:from-teal-600 hover:via-purple-600 hover:to-teal-700";
export const sidebarBg =
  "bg-gradient-to-b from-white to-teal-50/50 dark:from-gray-800 dark:to-gray-900/80";
export const sidebarHoverBg = "hover:bg-teal-100/60 dark:hover:bg-teal-900/30";
export const sidebarActiveBg = "bg-teal-100 dark:bg-teal-900/40";
export const sidebarTextColor = "text-gray-700 dark:text-gray-300";
export const sidebarActiveTextColor = "text-teal-800 dark:text-teal-200";
export const newChatButtonColor =
  "text-teal-700 dark:text-teal-300 hover:bg-teal-100/80 dark:hover:bg-teal-900/40 border-teal-200 dark:border-teal-700";
