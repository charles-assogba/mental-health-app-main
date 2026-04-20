import { FC, RefObject } from "react";
import { CommunityThreadProps, Thread } from "./CommunityThread.type";
import ThreadCard from "@/components/ThreadCard/ThreadCard";
import CommentCard from "@/components/CommentCard/CommentCard";
import LoadableButton from "@/components/LoadableButton/LoadableButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MessageSquare,
  MessagesSquare,
  Send,
  X,
  HeartHandshake,
  List,
  MessageSquarePlus,
} from "lucide-react";
import SmThreadCard from "@/components/SmThreadCard/SmThreadCard";
import {
  pageVariants,
  containerStaggerVariants,
  itemFadeUpVariants,
  commentBoxVariants,
  buttonHoverEffect,
  cardHoverEffect,
} from "./CommunityThread.data";

const CommunityThreadView: FC<CommunityThreadProps> = ({
  error,
  loading,
  submitThread,
  createCommentOpen,
  setTextareaStatus,
  textareaRef,
  thread,
  // threadsList,
  safeThread,
  comments,
  safeThreadsList,
  loggedIn,
}) => {
  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center w-full py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30 min-h-screen"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
        className="w-full max-w-7xl mb-8"
      >
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between mb-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-teal-800 dark:text-teal-400 flex items-center gap-3">
            <MessagesSquare className="w-8 h-8 text-teal-600" />
            <h2 className="text-center md:text-start">Detail Diskusi</h2>
          </h1>
          <Link to="/community">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="cursor-pointer border-teal-300 text-teal-700 hover:bg-teal-100/50 hover:text-teal-800 dark:text-teal-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Komunitas
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 w-full max-w-7xl mx-auto">
        <motion.div
          variants={containerStaggerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:col-span-2 space-y-8"
        >
          {thread && (
            <motion.div variants={itemFadeUpVariants}>
              <ThreadCard data={safeThread as Thread} isFull />
            </motion.div>
          )}

          <motion.section
            variants={itemFadeUpVariants}
            className="flex flex-col space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700"
          >
            <h3 className="text-2xl font-semibold text-teal-700 dark:text-teal-300 flex items-center gap-2">
              <MessageSquare className="w-6 h-6" /> Komentar ({comments.length})
            </h3>

            <div className="mt-4">
              <AnimatePresence initial={false}>
                {loggedIn ? (
                  <>
                    {!createCommentOpen && (
                      <motion.div
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Input
                          onClick={() => setTextareaStatus(true)}
                          placeholder="✨ Tulis komentarmu di sini..."
                          className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500 transition-shadow duration-200"
                        />
                      </motion.div>
                    )}
                    {createCommentOpen && (
                      <motion.div
                        key="textarea"
                        variants={commentBoxVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="flex flex-col space-y-4">
                          <Textarea
                            ref={textareaRef as RefObject<HTMLTextAreaElement>}
                            className="h-[120px] focus:ring-2 focus:ring-teal-400 focus:border-transparent border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100 transition-shadow duration-200"
                            placeholder="Bagikan pemikiranmu secara positif dan suportif..."
                          />
                          {error && (
                            <p className="text-red-500 text-sm font-medium px-1">
                              {error}
                            </p>
                          )}
                          <div className="flex items-center space-x-3 self-end">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                onClick={() => setTextareaStatus(false)}
                                className="cursor-pointer text-gray-700 dark:text-gray-300"
                                variant="ghost"
                                size="sm"
                              >
                                <X className="w-4 h-4 mr-1" /> Batal
                              </Button>
                            </motion.div>
                            <motion.button
                              whileHover={buttonHoverEffect}
                              whileTap={{ scale: 0.95 }}
                            >
                              <LoadableButton
                                isLoading={loading}
                                onClick={submitThread}
                                className="cursor-pointer bg-teal-600 hover:bg-teal-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                              >
                                <Send className="w-4 h-4 ml-4 mr-2" />
                                <p className="pr-6">Kirim</p>
                              </LoadableButton>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <Link
                    className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                    to="/login"
                  >
                    Masuk untuk menambahkan komentar
                  </Link>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              variants={containerStaggerVariants}
              className="flex flex-col space-y-5 pt-4 border-t border-gray-200 dark:border-slate-700 mt-6"
            >
              {comments.length > 0 ? (
                comments.map((item) => (
                  <motion.div key={item.id} variants={itemFadeUpVariants}>
                    <CommentCard
                      loggedIn={loggedIn}
                      data={item}
                      replies={item.thread_comment_replies || []}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.p
                  variants={itemFadeUpVariants}
                  className="text-center text-gray-500 dark:text-gray-400 py-6 text-sm"
                >
                  Belum ada komentar. Jadilah yang pertama!
                </motion.p>
              )}
            </motion.div>
          </motion.section>
        </motion.div>

        <aside className="flex flex-col space-y-8 lg:sticky lg:top-24 h-fit">
          {" "}
          <motion.div
            className="rounded-xl"
            variants={itemFadeUpVariants}
            whileHover={cardHoverEffect}
          >
            <Card className="h-auto bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-slate-800 dark:to-gray-800 shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
              <CardContent className="flex flex-col h-full space-y-4 p-6 justify-center items-center text-center">
                <motion.div
                  animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 1.5 }}
                >
                  <MessageSquarePlus className="w-10 h-10 text-teal-600 mb-2" />
                </motion.div>
                <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-400">
                  Punya cerita lain?
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Mulai percakapan baru kapan saja Anda membutuhkannya.
                </p>

                {loggedIn ? (
                  <Link to="/create-thread">
                    <motion.div
                      whileHover={buttonHoverEffect}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="default"
                        className="bg-teal-600 hover:bg-teal-500 text-white cursor-pointer rounded-full px-6 py-2.5 font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                      >
                        Mulai Diskusi Baru
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
                        size="default"
                        className="bg-teal-600 hover:bg-teal-500 text-white cursor-pointer rounded-full px-6 py-2.5 font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                      >
                        Masuk Untuk Mulai Diskusi
                      </Button>
                    </motion.div>
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemFadeUpVariants}>
            <Card className="bg-green-50 border border-green-200 rounded-lg text-green-800 shadow-sm">
              <CardHeader className="flex flex-row items-center space-x-2 pt-4 pb-2 px-4">
                <HeartHandshake className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <CardTitle className="text-base font-semibold">
                  Berkomunikasi dengan Hati
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 text-xs leading-relaxed">
                Ingatlah untuk berbagi dan menanggapi dengan empati, rasa
                hormat, dan dukungan. Ruang ini milik kita bersama.
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={itemFadeUpVariants}
            className="rounded-xl"
            whileHover={{ ...cardHoverEffect, scale: 1 }}
          >
            <Card className="shadow-lg pt-0 rounded-xl bg-white dark:bg-slate-800 overflow-hidden border border-gray-100 dark:border-slate-700">
              <CardHeader className="px-6 pt-8 bg-gradient-to-r from-cyan-50/60 to-emerald-50/60 dark:from-cyan-900/40 dark:to-emerald-900/40 border-b dark:border-slate-700">
                <CardTitle className="font-semibold text-lg text-teal-700 dark:text-teal-300 flex items-center gap-2">
                  <List className="w-5 h-5" /> Diskusi Lainnya
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[380px] overflow-y-auto nice-scrollbar">
                {" "}
                {safeThreadsList.length > 0 ? (
                  <motion.div
                    variants={containerStaggerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col space-y-2"
                  >
                    {safeThreadsList
                      .filter((item) => item.id !== safeThread?.id)
                      .slice(0, 7)
                      .map((item) => (
                        <motion.div
                          key={item.id}
                          variants={itemFadeUpVariants}
                          whileHover={{
                            backgroundColor: "rgba(0,128,128,0.05)",
                            x: 2,
                            transition: { duration: 0.1 },
                          }}
                          className="rounded-md transition-colors duration-150 ease-in-out"
                        >
                          <SmThreadCard data={item} />
                        </motion.div>
                      ))}
                  </motion.div>
                ) : (
                  <motion.p
                    variants={itemFadeUpVariants}
                    className="text-center text-gray-500 dark:text-gray-400 py-4 text-sm"
                  >
                    Tidak ada diskusi lain saat ini.
                  </motion.p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </aside>
      </section>
    </motion.section>
  );
};

export default CommunityThreadView;
