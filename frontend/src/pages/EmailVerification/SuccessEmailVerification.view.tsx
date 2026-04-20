import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FC } from "react";
import { cn } from "@/lib/utils";
import {
  pageVariants,
  cardVariants,
  iconBg,
  iconColor,
  textContainerVariants,
  textVariants,
  buttonHoverTap,
  primaryButtonGradient,
} from "./EmailVerification.data";
import {
  confettiVariants,
  confettiColors,
  successIconVariants,
} from "./SuccessEmailVerification.data";

const SuccessEmailVerificationView: FC = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-950 dark:to-cyan-950/50 relative overflow-hidden"
    >
      <motion.div
        initial="initial"
        animate="animate"
        className="absolute top-5 right-5 w-60 h-60 bg-emerald-300/30 dark:bg-emerald-500/20 rounded-full filter blur-3xl"
      />
      <motion.div
        initial="initial"
        animate="animate"
        className="absolute bottom-5 left-5 w-72 h-72 bg-cyan-300/30 dark:bg-cyan-500/20 rounded-full filter blur-3xl"
      />

      <motion.div
        variants={cardVariants}
        className="w-full max-w-lg p-8 sm:p-10 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 text-center z-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              variants={confettiVariants}
              initial="initial"
              animate="animate"
              custom={i}
              className={`absolute top-1/3 left-1/2 w-2 h-2 ${
                confettiColors[i % confettiColors.length]
              } rounded-sm`}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          ))}
        </div>

        <motion.div
          variants={successIconVariants}
          initial="hidden"
          animate="visible"
          className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${iconBg}`}
        >
          <CheckCircle className={`h-9 w-9 ${iconColor}`} />
        </motion.div>

        <motion.div variants={textContainerVariants}>
          <motion.h1
            variants={textVariants}
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3"
          >
            Verification Successful!
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base leading-relaxed"
          >
            Congratulations! Your email address has been successfully verified.
            You are one step closer to starting your mental health journey.
          </motion.p>
          <motion.p
            variants={textVariants}
            className="text-xs text-gray-500 dark:text-gray-400 mb-8"
          >
            You can now log in to your account and begin exploring the app
            features.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          className="flex justify-center items-center"
        >
          <motion.div
            className="w-full sm:w-auto"
            whileHover="hover"
            whileTap="tap"
            variants={buttonHoverTap}
          >
            <Button
              asChild
              className={cn(
                "w-[200px] h-11 rounded-lg px-8",
                primaryButtonGradient,
                "text-white font-semibold shadow-lg hover:shadow-md transition-shadow"
              )}
            >
              <Link to="/login" className="flex items-center justify-center">
                Continue to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessEmailVerificationView;
