import { FC } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  Settings,
  UserCircle,
  MapPin,
  KeyRound,
  PenLine,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  // userData,
  // addressData,
  pageVariants,
  iconColor,
  sectionStagger,
  cardFadeUp,
  buttonHoverTap,
  editButtonColor,
  gridContainerVariants,
  gridItemVariants,
  labelColor,
  valueColor,
  accentColor,
} from "./AccountSettings.data";
import { AccountSettingsProps } from "./AccountSettings.type";

const AccountSettingsView: FC<AccountSettingsProps> = ({ user }) => {
  const personalInfoItems = [
    { label: "Nama Lengkap", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Nomor Handphone", value: user?.phone_number || "-" },
    {
      label: "Gender",
      value:
        user?.gender === "MALE"
          ? "Laki Laki"
          : user?.gender === "FEMALE"
          ? "Perempuan"
          : "Lainnya",
    },
    {
      label: "Bio Singkat",
      value: user?.bio || "...",
      colSpan: "sm:col-span-2",
    },
  ];

  const addressInfoItems = [
    { label: "Negara", value: user?.country || "-" },
    {
      label: "Provinsi",
      value: user?.province || "-",
    },
    {
      label: "Kota",
      value: user?.city || "-",
    },
    { label: "Jalan", value: user?.street || "-", colSpan: "sm:col-span-2" },
    { label: "Kode Pos", value: user?.postal || "-" },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-gradient-to-br from-cyan-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-950"
    >
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="max-w-5xl mx-auto mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Settings className={`w-8 h-8 ${iconColor}`} />
          Pengaturan Akun
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
          Kelola informasi profil, alamat, dan keamanan akun Anda.
        </p>
      </motion.div>

      <motion.div
        variants={sectionStagger}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto grid grid-cols-1 gap-8"
      >
        <motion.div variants={cardFadeUp} whileHover="hover">
          <Card className="w-full rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 px-6 pt-5 border-b dark:border-gray-700/70">
              <div className="flex items-center gap-3">
                <UserCircle className={`w-6 h-6 ${iconColor}`} />
                <CardTitle className="text-xl font-semibold">
                  Informasi Pribadi
                </CardTitle>
              </div>

              <Link
                to="/account-settings/change-personal-info"
                className="flex-shrink-0"
              >
                <motion.div
                  className="rounded-xl"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonHoverTap}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full text-xs px-4 py-1 h-auto",
                      editButtonColor
                    )}
                  >
                    <PenLine className="w-3.5 h-3.5 mr-1.5" />
                    Ubah
                  </Button>
                </motion.div>
              </Link>
            </CardHeader>
            <CardContent className="p-6">
              <motion.dl
                variants={gridContainerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
              >
                {personalInfoItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={gridItemVariants}
                    className={cn("space-y-1", item.colSpan)}
                  >
                    <dt
                      className={`text-xs uppercase font-medium tracking-wider ${labelColor}`}
                    >
                      {item.label}
                    </dt>
                    <dd
                      className={`text-sm font-medium break-words ${valueColor}`}
                    >
                      {item.value}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardFadeUp} whileHover="hover">
          <Card className="w-full rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 px-6 pt-5 border-b dark:border-gray-700/70">
              <div className="flex items-center gap-3">
                <MapPin className={`w-6 h-6 ${accentColor}`} />
                <CardTitle className="text-xl font-semibold">Alamat</CardTitle>
              </div>
              <Link
                to="/account-settings/change-address-info"
                className="flex-shrink-0"
              >
                <motion.div
                  className="rounded-xl"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonHoverTap}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full text-xs px-4 py-1 h-auto border-purple-300 text-purple-700 hover:bg-purple-100/50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30 dark:hover:border-purple-600"
                    )}
                  >
                    <PenLine className="w-3.5 h-3.5 mr-1.5" />
                    Ubah
                  </Button>
                </motion.div>
              </Link>
            </CardHeader>
            <CardContent className="p-6">
              <motion.dl
                variants={gridContainerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
              >
                {addressInfoItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={gridItemVariants}
                    className={cn("space-y-1", item.colSpan)}
                  >
                    <dt
                      className={`text-xs uppercase font-medium tracking-wider ${labelColor}`}
                    >
                      {item.label}
                    </dt>
                    <dd
                      className={`text-sm font-medium break-words ${valueColor}`}
                    >
                      {item.value}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardFadeUp} whileHover="hover">
          <Card className="w-full rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm overflow-hidden">
            <CardHeader className="px-6 pt-5 pb-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-xl font-semibold">
                  Keamanan Akun
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className={`font-medium ${valueColor}`}>Kata Sandi</h4>
                <p className={`text-sm mt-1 ${labelColor}`}>
                  Ganti kata sandi Anda secara berkala untuk keamanan.
                </p>
              </div>
              <Link
                to="/account-settings/change-password"
                className="flex-shrink-0"
              >
                <motion.div
                  className="rounded-xl"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonHoverTap}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full text-xs px-4 py-1 h-auto border-blue-300 text-blue-700 hover:bg-blue-100/50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30 dark:hover:border-blue-600"
                    )}
                  >
                    <KeyRound className="w-3.5 h-3.5 mr-1.5" /> Ubah Kata Sandi
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardFadeUp}>
          <Separator className="my-4 dark:bg-gray-700" />
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">
                Hapus Akun Anda
              </h3>
              <p className="text-sm mt-1 text-red-700 dark:text-red-300">
                Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
              </p>
            </div>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonHoverTap}
            >
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" /> Hapus Akun Saya
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AccountSettingsView;
