import { Button } from "@/components/ui/button";
import { MailCheck, ArrowRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FC } from "react";
import { cn } from "@/lib/utils";
import {
  pageVariants,
  cardVariants,
  iconWrapperVariants,
  iconPulse,
  textContainerVariants,
  textVariants,
  buttonHoverTap,
  iconBg,
  iconColor,
  primaryButtonGradient,
} from "./EmailVerification.data";

const EmailVerificationView: FC = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-cyan-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-teal-950 dark:to-purple-950/50 relative overflow-hidden"
    >
      <motion.div
        initial="initial"
        animate="animate"
        className="absolute top-10 left-10 w-64 h-64 bg-teal-300/30 dark:bg-teal-500/20 rounded-full filter blur-3xl"
      />
      <motion.div
        initial="initial"
        animate="animate"
        className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-500/20 rounded-full filter blur-3xl"
      />

      <motion.div
        variants={cardVariants}
        className="w-full max-w-lg p-8 sm:p-10 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 text-center z-10"
      >
        <motion.div
          variants={iconWrapperVariants}
          animate={iconPulse.animate}
          className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${iconBg}`}
        >
          <MailCheck className={`h-8 w-8 ${iconColor}`} />
        </motion.div>

        <motion.div variants={textContainerVariants}>
          <motion.h1
            variants={textVariants}
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3"
          >
            Check Your Email
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base leading-relaxed"
          >
            We’ve sent a verification link to the email address you registered
            with. Please click the link to activate your account.
          </motion.p>
          <motion.p
            variants={textVariants}
            className="text-xs text-gray-500 dark:text-gray-400 mb-8"
          >
            If you don’t see it in your inbox, check the Spam or Promotions
            folder.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
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
                "w-full md:w-[220px] h-11 rounded-lg px-6",
                primaryButtonGradient,
                "text-white font-semibold shadow-lg hover:shadow-md transition-shadow"
              )}
            >
              <Link to="/login" className="flex items-center justify-center">
                Go to Login Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="w-full sm:w-auto"
            whileHover="hover"
            whileTap="tap"
            variants={buttonHoverTap}
          >
            <Button
              variant="outline"
              className="w-full h-11 rounded-lg border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Resend Email
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EmailVerificationView;
