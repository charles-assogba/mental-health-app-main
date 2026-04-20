const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const containerStaggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemFadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const commentBoxVariants = {
  hidden: { opacity: 0, height: 0, marginBottom: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginBottom: "1.5rem",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const buttonHoverEffect = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 15 },
};

const cardHoverEffect = {
  scale: 1,
  boxShadow: "0px 6px 20px rgba(0, 128, 128, 0.1)",
  transition: { type: "spring", stiffness: 300 },
};

export {
  pageVariants,
  containerStaggerVariants,
  itemFadeUpVariants,
  commentBoxVariants,
  buttonHoverEffect,
  cardHoverEffect,
};
