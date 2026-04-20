import { FC } from "react";
import { CommunityFormProps } from "./CommunityForm.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadableButton from "@/components/LoadableButton/LoadableButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Lightbulb,
  CheckCircle,
  PenSquare,
  HeartHandshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buttonHoverTap,
  formContainerStagger,
  formItemFadeUp,
  pageFadeIn,
} from "./CommunityForm.data";

const CommunityFormView: FC<CommunityFormProps> = ({
  form,
  onSubmit,
  error,
  loading,
}) => {
  return (
    <motion.section
      variants={pageFadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30 min-h-screen"
    >
      <div className="w-full max-w-3xl">
        {" "}
        <motion.div
          variants={formItemFadeUp}
          className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-teal-800 flex items-center gap-3">
            <PenSquare className="w-8 h-8 hidden md:block text-teal-600" />
            <h2 className="text-center md:text-start">Bagikan Cerita Anda</h2>
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
        </motion.div>
        <motion.div
          variants={formContainerStagger}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={formItemFadeUp}>
            <Card className="mb-6 bg-emerald-50 dark:bg-slate-800/50 border border-emerald-200 dark:border-emerald-900/30 rounded-xl shadow-md overflow-hidden">
              <CardHeader className="pb-3 pt-5 px-6 bg-gradient-to-r from-emerald-100/70 to-teal-100/50 dark:from-emerald-900/30 dark:to-teal-900/20">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                  <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Tips Memulai Percakapan</span>
                </CardTitle>
                <CardDescription className="text-sm text-emerald-700 dark:text-emerald-300/80 pt-1">
                  Beberapa saran agar ceritamu lebih mudah dipahami & mendapat
                  dukungan:
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pt-4 pb-5">
                <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                  {[
                    {
                      strong: "Jelas & Spesifik:",
                      text: "Ceritakan apa yang kamu rasakan atau alami agar orang lain lebih mudah terhubung.",
                    },
                    {
                      strong: "Fokus pada Perasaan:",
                      text: "Selain kejadian, ungkapkan bagaimana situasi itu memengaruhi perasaanmu.",
                    },
                    {
                      strong: "Bertanya dengan Jelas:",
                      text: "Jika mencari saran, sampaikan pertanyaanmu secara langsung.",
                    },
                    {
                      strong: "Bagikan yang Sudah Dicoba:",
                      text: "Sebutkan solusi yang sudah kamu coba agar saran lebih relevan.",
                    },
                    {
                      strong: "Jaga Batasanmu:",
                      text: "Bagikan hanya yang membuatmu nyaman untuk didiskusikan di ruang publik.",
                    },
                  ].map((tip, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2.5"
                      custom={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>{tip.strong}</strong> {tip.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={formItemFadeUp}>
            <Card className="mb-6 bg-cyan-50 dark:bg-slate-800/50 border border-cyan-200 dark:border-cyan-900/30 rounded-xl shadow-md overflow-hidden">
              <CardHeader className="px-6 pt-6 pb-2">
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Detail Percakapan
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  Isi detail berikut untuk memulai diskusi baru.
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="transition-opacity duration-300"
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  <CardContent className="px-6 pt-4 space-y-5">
                    <motion.div variants={formItemFadeUp}>
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormLabel
                              htmlFor="title"
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Judul Topik
                            </FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.02 }}>
                                <Input
                                  id="title"
                                  placeholder="cth: Merasa cemas saat bertemu orang baru"
                                  required
                                  className="bg-white dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                              Buat judul yang singkat dan jelas.
                            </FormDescription>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    <motion.div variants={formItemFadeUp}>
                      <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormLabel
                              htmlFor="body"
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Cerita / Pertanyaan Anda
                            </FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.01 }}>
                                <Textarea
                                  id="body"
                                  placeholder="Tuliskan apa yang ada di pikiranmu di sini. Ingat, kamu tidak sendirian..."
                                  className="min-h-[220px] resize-y bg-white dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                                  required
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>

                            <FormDescription className="text-xs pb-6 text-gray-500 dark:text-gray-400">
                              Detail akan membantu orang lain memahami dan
                              memberi dukungan yang relevan.
                            </FormDescription>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row items-center gap-4 px-6 py-5 bg-gradient-to-r from-cyan-50/50 to-cyan-50/30 dark:from-slate-800 dark:to-slate-900/50 border-t dark:border-slate-700">
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full text-center sm:text-left text-sm text-red-600 dark:text-red-400 font-medium flex-grow"
                      >
                        {error}
                      </motion.p>
                    )}
                    <div className="w-full sm:w-auto sm:ml-auto">
                      {" "}
                      <motion.button
                        whileHover={!loading ? buttonHoverTap.hover : {}}
                        whileTap={!loading ? buttonHoverTap.tap : {}}
                      >
                        <LoadableButton
                          isLoading={loading}
                          type="submit"
                          className={cn(
                            "w-full sm:w-auto px-8 py-3 text-base font-semibold rounded-full cursor-pointer transition-all duration-300 ease-in-out",
                            "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl disabled:opacity-70"
                          )}
                          disabled={loading}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Send className="h-5 w-5" />
                            Kirim Percakapan
                          </span>
                        </LoadableButton>
                      </motion.button>
                    </div>
                  </CardFooter>
                </form>
              </Form>

              <div className="px-6 pb-4 text-center mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />{" "}
                  Ingatlah untuk berbagi dengan bijak dan menjaga privasi.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>{" "}
      </div>{" "}
    </motion.section>
  );
};

export default CommunityFormView;
