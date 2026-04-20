const sectionRevealVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    marginBottom: 0,
    overflow: "hidden",
  },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: "1rem",
    marginBottom: "0.5rem",
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    marginBottom: 0,
    overflow: "hidden",
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

const repliesListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: { opacity: 0 },
};

const replyItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

const buttonHoverEffect = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 15 },
};

export {
  sectionRevealVariants,
  repliesListVariants,
  replyItemVariants,
  buttonHoverEffect,
};
