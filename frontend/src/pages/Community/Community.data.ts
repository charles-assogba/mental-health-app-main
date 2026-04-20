const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const cardHoverEffect = {
  scale: 1.0,
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  transition: { type: "spring", stiffness: 300 },
};

const buttonHoverEffect = {
  scale: 1.05,
  backgroundColor: "hsl(var(--primary-hover))",
  transition: { type: "spring", stiffness: 400, damping: 15 },
};

// akan dihapus nti
const exampleActiveUsers = [
  { id: 1, name: "User One", avatarUrl: "/placeholder-avatar.png" },
  { id: 2, name: "User Two", avatarUrl: "/placeholder-avatar.png" },
  { id: 3, name: "User Three", avatarUrl: "/placeholder-avatar.png" },
  { id: 4, name: "User Four", avatarUrl: "/placeholder-avatar.png" },
  { id: 5, name: "User Five", avatarUrl: "/placeholder-avatar.png" },
  { id: 6, name: "User Six", avatarUrl: "/placeholder-avatar.png" },
];

export {
  containerVariants,
  itemVariants,
  cardHoverEffect,
  buttonHoverEffect,
  exampleActiveUsers,
};
