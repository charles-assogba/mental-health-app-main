import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadableButton from "@/components/LoadableButton/LoadableButton";
import { Progress } from "@/components/ui/progress";

import {
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  Save,
  ShieldAlert,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  pageVariants,
  cardFadeUp,
  formContainerStagger,
  formItemVariants,
  strengthColors,
  strengthText,
  errorVariant,
  buttonHoverTap,
} from "./PasswordChange.data";
import { PasswordChangeProps } from "./PasswordChange.type";

const PasswordChangeView: FC<PasswordChangeProps> = ({
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  loading,
  error,
  passwordStrength,
  onSubmit,
  navigate,
  form,
  newPasswordValue,
}) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center px-4 py-12 min-h-screen bg-gradient-to-br from-cyan-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-950"
    >
      <div className="w-full max-w-lg mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Pengaturan
        </Button>
      </div>

      <motion.div className="flex justify-center w-full" variants={cardFadeUp}>
        <Card className="w-full max-w-lg rounded-xl shadow-xl border border-gray-200/80 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md overflow-hidden">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30"
            >
              <KeyRound className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">
              Ubah Kata Sandi
            </CardTitle>
            <CardDescription>
              Masukkan kata sandi lama dan baru Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <Form {...form}>
              <motion.form
                variants={formContainerStagger}
                initial="hidden"
                animate="visible"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kata Sandi Saat Ini</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="Masukkan kata sandi lama"
                              required
                              {...field}
                              className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500 h-11 pr-10"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 h-11 w-10 text-gray-500 hover:bg-transparent"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            aria-label="Toggle current password visibility"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kata Sandi Baru</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Minimal 8 karakter"
                              required
                              {...field}
                              className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500 h-11 pr-10"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 h-11 w-10 text-gray-500 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            aria-label="Toggle new password visibility"
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        {newPasswordValue && (
                          <div className="mt-2 space-y-1">
                            <Progress
                              value={passwordStrength * 20}
                              className={cn(
                                "h-1.5 [&>div]:transition-all [&>div]:duration-300",
                                strengthColors[passwordStrength]
                              )}
                            />
                            <p
                              className={`text-xs font-medium ${strengthColors[
                                passwordStrength
                              ].replace("bg", "text")}`}
                            >
                              {strengthText[passwordStrength]}
                            </p>
                          </div>
                        )}
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Ulangi kata sandi baru"
                              required
                              {...field}
                              className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500 h-11 pr-10"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 h-11 w-10 text-gray-500 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            aria-label="Toggle confirm password visibility"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
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
                      className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-md text-center font-medium flex items-center justify-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4" /> {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div variants={formItemVariants} className="pt-2">
                  <motion.button
                    whileHover={!loading ? buttonHoverTap.hover : {}}
                    whileTap={!loading ? buttonHoverTap.tap : {}}
                  >
                    <LoadableButton
                      isLoading={loading}
                      type="submit"
                      className={cn(
                        "w-full h-11 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70"
                      )}
                      disabled={loading}
                    >
                      <Save className="mr-2 h-5 w-5" /> Simpan Perubahan
                    </LoadableButton>
                  </motion.button>
                </motion.div>
              </motion.form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PasswordChangeView;
