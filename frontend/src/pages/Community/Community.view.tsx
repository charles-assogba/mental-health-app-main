import { FC } from "react";
import ThreadCard from "@/components/ThreadCard/ThreadCard";
import ActiveUserCard from "@/components/ActiveUserCard/ActiveUserCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquarePlus, Users, Info, Activity } from "lucide-react";
import { CommunityProps } from "./Community.type";
import {
  containerVariants,
  itemVariants,
  cardHoverEffect,
  buttonHoverEffect,
} from "./Community.data";
import PaginationControls from "@/components/PaginationControls";
import { Skeleton } from "@/components/ui/skeleton";

interface ExtendedCommunityProps extends CommunityProps {
  isLoading?: boolean;
  fetchThreads: (page: number) => Promise<void>;
}

const CommunityView: FC<ExtendedCommunityProps> = ({
  threads,
  users,
  loggedIn,
  pagination,
  isLoading = false,
  fetchThreads,
}) => {
  const ThreadSkeleton = () => (
    <div className="flex flex-col space-y-3 p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-slate-800/50">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex justify-end pt-2">
        <Skeleton className="h-6 w-[100px]" />
      </div>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30 min-h-screen"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
        className="w-full max-w-6xl mb-10"
      >
        <div className="flex space-x-6 text-4xl md:text-5xl self-start font-bold tracking-tight text-teal-700 dark:text-teal-400 items-center">
          <Activity className="w-10 h-10 hidden md:block text-teal-500" />
          <h2 className="text-center md:text-start">
            Mental Wellness Community Forum
          </h2>
        </div>
        <p className="text-center text-base md:text-lg md:text-start text-gray-600 dark:text-gray-400 mt-2">
          A safe space to share, support, and connect.
        </p>
      </motion.div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl mx-auto"
      >
        <motion.div className="flex flex-col col-span-1 md:col-span-2 space-y-6 md:space-y-8 order-2 md:order-1">
          <h2 className="text-2xl font-semibold text-teal-800 dark:text-teal-400 mb-8">
            {" "}
            Latest Discussions
          </h2>

          <div className="space-y-6 md:space-y-8 min-h-[400px]">
            {" "}
            {isLoading ? (
              <>
                <ThreadSkeleton />
                <ThreadSkeleton />
                <ThreadSkeleton />
              </>
            ) : threads.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {threads.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ThreadCard fetchThreads={fetchThreads} data={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 py-16 flex flex-col items-center gap-4"
              >
                <MessageSquarePlus className="w-12 h-12 text-gray-400" />
                <span>No discussions yet. Be the first!</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <aside className="flex flex-col space-y-8 order-1 md:order-2 lg:sticky lg:top-24 h-fit">
          {" "}
          <motion.div
            className="rounded-xl"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <Card className="h-auto bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-slate-800 dark:to-gray-800 shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
              <CardContent className="flex rounded-xl flex-col h-full space-y-4 p-6 justify-center items-center text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                >
                  <MessageSquarePlus className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-3" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-teal-800 dark:text-teal-400">
                  Share Your Story
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                  Start a new conversation, ask a question, or offer support.
                </p>
                {loggedIn ? (
                  <Link to="/create-thread">
                    <motion.div
                      whileHover={buttonHoverEffect}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="bg-teal-600 hover:bg-teal-500 text-white cursor-pointer rounded-full px-6 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                      >
                        Start New Discussion
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <Link to="/login">
                    <motion.div
                      whileHover={buttonHoverEffect}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="bg-teal-600 hover:bg-teal-500 text-white cursor-pointer rounded-full px-6 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                      >
                        Login to Start a Discussion
                      </Button>
                    </motion.div>
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="bg-yellow-50 dark:bg-slate-800 border dark:border-inherit border-yellow-200 rounded-lg text-yellow-800 dark:text-gray-400 shadow-sm">
              <CardHeader className="flex flex-row items-center space-x-2 pt-4 pb-2 px-4">
                <Info className="w-5 h-5 text-yellow-600 dark:text-gray-400 flex-shrink-0" />
                <CardTitle className="text-lg font-semibold">
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4  pb-4 text-sm">
                Let's keep this space positive, supportive, and respectful.
                <Link
                  to="/community-guidelines"
                  className="text-teal-600 hover:underline ml-1 font-medium"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="rounded-xl"
            whileHover={{ ...cardHoverEffect, scale: 1.0 }}
          >
            <Card className="shadow-lg rounded-xl bg-white dark:bg-slate-800 overflow-hidden pt-0">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-slate-800 dark:to-gray-800 px-6 pt-8 border-b">
                <CardTitle className="font-semibold text-xl text-teal-700 dark:text-teal-400 flex items-center gap-2">
                  <Users className="w-5 h-5" /> Active Users
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 max-h-[400px] overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col space-y-3"
                >
                  {users.filter((user) => user._count.thread_comments > 5)
                    .length > 0 ? (
                    users
                      .filter((user) => user._count.thread_comments > 5)
                      .slice(0, 8)
                      .map((user) => (
                        <motion.div
                          key={user.id}
                          whileHover={{
                            backgroundColor: "rgba(0,0,0,0.03)",
                            x: 2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                          className="rounded-md"
                        >
                          <ActiveUserCard user={user} />
                        </motion.div>
                      ))
                  ) : (
                    <p className="text-sm text-center text-gray-500 py-4">
                      No highly active users yet.
                    </p>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </aside>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="self-start pl-8 pt-12"
      >
        {pagination && pagination.totalPages > 1 && !isLoading && (
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        )}
      </motion.section>
    </motion.section>
  );
};

export default CommunityView;
