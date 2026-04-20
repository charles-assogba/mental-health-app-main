const cardVariants = {
  hover: {
    backgroundColor: "rgba(0, 128, 128, 0.07)",

    scale: 1.02,
    boxShadow: "0px 4px 15px rgba(0, 128, 128, 0.08)",
    transition: { type: "spring", stiffness: 350, damping: 20 },
  },
  tap: {
    scale: 0.97,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export { cardVariants };
