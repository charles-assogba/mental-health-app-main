import { z } from "zod";

const pageVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "circOut" } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: "circIn" } },
};
const cardFadeUp = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 },
  },
};
const formContainerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
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

const personalInfoSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi."),
  email: z.string().min(1, "Email wajib diisi."),
  phone_number: z.string().optional(),
  gender: z.string().optional(),
  bio: z.string().optional(),
});

export {
  pageVariants,
  cardFadeUp,
  formContainerStagger,
  formItemVariants,
  buttonHoverTap,
  errorVariant,
  personalInfoSchema,
};
