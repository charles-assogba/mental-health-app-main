import { FC } from "react";
import { LoginProps } from "./Login.type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadableButton from "@/components/LoadableButton/LoadableButton";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Sparkles, HeartPulse, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  pageTransition,
  leftPanelVariants,
  rightPanelVariants,
  formContainerVariants,
  formItemVariants,
  inputFocusVariant,
  inputFocusRing,
  linkColor,
  errorVariant,
  buttonHoverTap,
  primaryGradient,
  secondaryButton,
} from "./Login.data";

const LoginView: FC<LoginProps> = ({ form, onSubmit, error, loading }) => {
  return (
    <motion.main
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 min-h-screen overflow-hidden"
    >
      <motion.aside
        variants={leftPanelVariants}
        className="flex absolute top-0 left-0 p-3 z-[200]"
      >
        <Link to="/">
          <Button variant={"ghost"}>
            <Home />
          </Button>
        </Link>
        <ModeToggle />
      </motion.aside>

      <motion.aside
        variants={leftPanelVariants}
        className="hidden md:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-cyan-100 via-teal-50 to-purple-100 dark:from-gray-900 dark:via-teal-950 dark:to-purple-950/60 relative overflow-hidden"
      >
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-80 h-80 bg-teal-300/20 dark:bg-teal-600/20 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{ y: ["0%", "10%", "0%"], x: ["0%", "-5%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -right-16 w-72 h-72 bg-purple-300/20 dark:bg-purple-600/20 rounded-full filter blur-3xl"
        />

        <div className="z-10 text-center space-y-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
          >
            <HeartPulse className="h-24 w-24 text-teal-600 dark:text-teal-400 mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-4xl font-bold tracking-tight text-teal-800 dark:text-teal-200"
          >
            Mental Health App
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-sm mx-auto"
          >
            Caring for your mind, one step at a time. Welcome back!
          </motion.p>
        </div>
      </motion.aside>

      <motion.section
        variants={rightPanelVariants}
        className="flex items-center justify-center py-12 px-6 sm:px-10 bg-white dark:bg-gray-800/50"
      >
        <div className="mx-auto w-full max-w-md">
          <motion.div
            variants={formContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={formItemVariants}
              className="space-y-2 text-center"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                Welcome Back{" "}
                <Sparkles className="w-7 h-7 hidden md:block text-amber-500" />
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Sign in to continue your journey.
              </p>
            </motion.div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">
                          Username
                        </FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus="focus"
                            variants={inputFocusVariant}
                          >
                            <Input
                              placeholder="toyotakijangkotaksabun1995"
                              required
                              {...field}
                              className={`bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${inputFocusRing} h-11`}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">
                          Password
                        </FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus="focus"
                            variants={inputFocusVariant}
                          >
                            <Input
                              type="password"
                              required
                              {...field}
                              placeholder="••••••••"
                              className={`bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${inputFocusRing} h-11`}
                            />
                          </motion.div>
                        </FormControl>

                        <div className="flex justify-end pt-1">
                          <Link
                            to="/forgot-password"
                            className={`text-sm underline ${linkColor} transition-colors`}
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      variants={errorVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-md text-center font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div variants={formItemVariants}>
                  <motion.button
                    className="w-full"
                    whileHover={!loading ? buttonHoverTap.hover : {}}
                    whileTap={!loading ? buttonHoverTap.tap : {}}
                  >
                    <LoadableButton
                      isLoading={loading}
                      type="submit"
                      className={cn(
                        "w-full h-11 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out",
                        primaryGradient,
                        "text-white disabled:opacity-70"
                      )}
                      disabled={loading}
                    >
                      <LogIn className="mr-2 h-5 w-5" /> Sign In
                    </LoadableButton>
                  </motion.button>
                </motion.div>

                <motion.div variants={formItemVariants} className="text-center">
                  <Link to="/register">
                    <motion.div
                      whileHover={buttonHoverTap.hover}
                      whileTap={buttonHoverTap.tap}
                    >
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 rounded-lg",
                          secondaryButton
                        )}
                      >
                        Create New Account
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </motion.section>
    </motion.main>
  );
};

export default LoginView;
