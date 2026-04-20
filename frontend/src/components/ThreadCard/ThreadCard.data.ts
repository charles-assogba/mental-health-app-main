const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.0,
    boxShadow: "0px 8px 25px rgba(0, 128, 128, 0.15)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

export { cardVariants };
