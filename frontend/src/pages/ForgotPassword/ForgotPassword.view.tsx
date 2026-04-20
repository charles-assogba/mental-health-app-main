import { FC } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  MailCheck,
  ArrowRight,
  HelpCircle,
  ArrowLeft,
  MailWarning,
  RefreshCw,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  pageVariants,
  cardVariants,
  contentSwitchVariants,
  iconWrapperVariants,
  iconBgInitial,
  iconColorInitial,
  textContainerStagger,
  textVariants,
  inputFocusRing,
  buttonHoverTap,
  primaryButtonGradient,
  iconBgConfirm,
  iconColorConfirm,
  secondaryButtonBorder,
} from "./ForgotPassword.data";
import LoadableButton from "@/components/LoadableButton/LoadableButton";
import { ForgotPasswordProps } from "./ForgotPassword.type";

const ForgotPasswordView: FC<ForgotPasswordProps> = ({
  resendLoading,
  emailSubmitted,
  setEmail,
  isLoading,
  // navigate,
  handleForgotPasswordSubmit,
  email,
  error,
  handleEmailResend,
}) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-950 dark:to-teal-950/50 relative overflow-hidden"
    >
      <motion.div
        initial="initial"
        animate="animate"
        className="absolute top-10 right-10 w-64 h-64 bg-blue-300/20 dark:bg-blue-500/15 rounded-full filter blur-3xl"
      />
      <motion.div
        initial="initial"
        animate="animate"
        className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-300/20 dark:bg-cyan-500/15 rounded-full filter blur-3xl"
      />

      <motion.div
        variants={cardVariants}
        className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 text-center z-10 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {" "}
          {!emailSubmitted ? (
            <motion.div
              key="forgot-password-form"
              variants={contentSwitchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                variants={iconWrapperVariants}
                className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${iconBgInitial}`}
              >
                <HelpCircle className={`h-8 w-8 ${iconColorInitial}`} />
              </motion.div>

              <motion.div variants={textContainerStagger}>
                <motion.h1
                  variants={textVariants}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  Forgot Password?
                </motion.h1>
                <motion.p
                  variants={textVariants}
                  className="text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base leading-relaxed"
                >
                  Don’t worry! Enter your registered email address, and we’ll send
                  a link to reset your password.
                </motion.p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onSubmit={handleForgotPasswordSubmit}
                className="space-y-5"
              >
                <div className="space-y-1 text-left">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "h-11 bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600",
                      inputFocusRing
                    )}
                    aria-describedby="email-error"
                  />

                  <p
                    id="email-error"
                    aria-live="polite"
                    className="h-4 text-xs text-red-600"
                  ></p>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-md font-medium flex items-center justify-center gap-2"
                    >
                      <MailWarning className="w-4 h-4" /> {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div variants={buttonHoverTap}>
                  <LoadableButton
                    type="submit"
                    isLoading={isLoading}
                    className={cn(
                      "w-full h-11 rounded-lg px-6 text-base font-semibold shadow-lg hover:shadow-md transition-all",
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : primaryButtonGradient + " text-white"
                    )}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                  </LoadableButton>
                </motion.div>
                <motion.div variants={buttonHoverTap}>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full h-11 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  >
                    <Link to="/login">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                    </Link>
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              key="confirmation-message"
              variants={contentSwitchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                variants={iconWrapperVariants}
                className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${iconBgConfirm}`}
              >
                <MailCheck className={`h-8 w-8 ${iconColorConfirm}`} />
              </motion.div>

              <motion.div variants={textContainerStagger}>
                <motion.h1
                  variants={textVariants}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  Reset Link Sent!
                </motion.h1>
                <motion.p
                  variants={textVariants}
                  className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base leading-relaxed"
                >
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your inbox.
                </motion.p>
                <motion.p
                  variants={textVariants}
                  className="text-xs text-gray-500 dark:text-gray-400 mb-8"
                >
                  If you don't see it, check your Spam folder or wait a few
                  minutes.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
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
                      "w-full md:w-[200px] h-11 rounded-lg px-6",
                      primaryButtonGradient,
                      "text-white font-semibold shadow-lg hover:shadow-md transition-shadow"
                    )}
                  >
                    <Link
                      to="/login"
                      className="flex items-center justify-center"
                    >
                      Back to Login
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
                  <LoadableButton
                    isLoading={resendLoading}
                    variant="outline"
                    className={cn(
                      "w-full md:w-[180px] h-11 rounded-lg",
                      secondaryButtonBorder
                    )}
                    onClick={() => handleEmailResend()}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Resend
                  </LoadableButton>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordView;
