const userData = {
  name: "Alex Johnson",
  username: "alex_j",
  bio: "Mindfulness explorer & aspiring writer. Taking it one day at a time.",
  avatarUrl: "/placeholder-user-1.jpg",
  bannerUrl: "/placeholder-banner-1.jpg",

  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.j@example.com",
  phone: "+1 555 987 6543",
  gender: "Prefer not to say",
};

const addressData = {
  country: "United States",
  city: "San Francisco",
  state: "CA",
  street: "123 Mindful Way",
  zipCode: "94107",
};

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const sectionContainerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const avatarVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.3, type: "spring", stiffness: 150 },
  },
};

const headerTextVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } },
};

const buttonHoverTap = {
  hover: { scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.08)" },
  tap: { scale: 0.95 },
};

export {
  userData,
  addressData,
  pageVariants,
  sectionContainerStagger,
  headerVariants,
  avatarVariants,
  headerTextVariants,
  buttonHoverTap,
};
