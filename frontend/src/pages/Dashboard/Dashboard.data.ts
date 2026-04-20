import { Sparkles, Sunrise, Headset, Bed } from "lucide-react";
import { MindfulnessSession } from "./Dashboard.type";

const userData = { name: "Alex" };
const mindfulnessSessions: MindfulnessSession[] = [
  {
    id: 1,
    title: "Bernapas Tenang",
    duration: "5 Menit",
    icon: Sparkles,
    color: "from-cyan-100 to-blue-100 dark:from-cyan-800 dark:to-blue-800",
  },
  {
    id: 2,
    title: "Fokus Pagi Hari",
    duration: "10 Menit",
    icon: Sunrise,
    color:
      "from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800",
  },
  {
    id: 3,
    title: "Redakan Stres",
    duration: "7 Menit",
    icon: Headset,
    color: "from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800",
  },
  {
    id: 4,
    title: "Tidur Nyenyak",
    duration: "12 Menit",
    icon: Bed,
    color:
      "from-indigo-100 to-violet-100 dark:from-indigo-800 dark:to-violet-800",
  },
];

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const moodButtonVariant = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.15, y: -3, transition: { type: "spring", stiffness: 300 } },
  tap: { scale: 0.9 },
};

const todosItemVariant = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30, transition: { duration: 0.2 } },
  hover: {
    backgroundColor: "rgba(0, 128, 128, 0.05)",
    transition: { duration: 0.15 },
  },
};

const sessionCardVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
  hover: {
    scale: 1.04,
    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.08)",
    transition: { type: "spring", stiffness: 300 },
  },
};

const progressVariant = (progress: number) => ({
  hidden: { width: "0%" },
  visible: {
    width: `${progress}%`,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.5 },
  },
});

export {
  userData,
  mindfulnessSessions,
  pageVariants,
  containerStagger,
  itemFadeUp,
  moodButtonVariant,
  todosItemVariant,
  sessionCardVariant,
  progressVariant,
};
