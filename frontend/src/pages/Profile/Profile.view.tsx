import { /* PenLine, Camera, */ Settings } from "lucide-react";
import AddressCard from "@/components/AddressCard/AddressCard";
import PersonalInfoCard from "@/components/PersonalInfoCard";
// import {
// DropdownMenu,
// DropdownMenuContent,
// DropdownMenuItem,
// DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  pageVariants,
  headerVariants,
  buttonHoverTap,
  avatarVariants,
  headerTextVariants,
  sectionContainerStagger,
} from "./Profile.data";
import { FC } from "react";
import { ProfileProps } from "./Profile.type";

const ProfileView: FC<ProfileProps> = ({ user, isMine }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col px-4 sm:px-6 lg:px-8 py-8 gap-8 md:gap-12 bg-gradient-to-br from-cyan-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-950 min-h-screen"
    >
      <motion.div variants={headerVariants} className="relative">
        <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-teal-200 to-cyan-300 dark:from-teal-700 dark:to-cyan-800">
          {/* {user.bannerUrl ? (
            <img
              src={user.bannerUrl}
              alt="Profile Banner"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : ( */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-cyan-500/5 to-purple-500/10 animate-pulse"></div>
          {/* )} */}

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                {...buttonHoverTap}
                className="absolute top-4 right-4 p-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Edit Banner"
              >
                <Camera className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mr-2">
              <DropdownMenuItem>Ubah Banner</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20">
                Hapus Banner
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>

        <div className="absolute -bottom-16 md:-bottom-12 left-4 md:left-10 flex items-end space-x-4">
          <motion.div variants={avatarVariants} className="relative">
            <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background dark:border-gray-800 shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-teal-400 to-purple-400 text-white text-3xl font-semibold">
                {user?.name?.charAt(0).toUpperCase()}{" "}
              </AvatarFallback>
            </Avatar>

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  {...buttonHoverTap}
                  className="absolute bottom-1 right-1 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                  aria-label="Edit Profile Picture"
                >
                  <PenLine className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Ubah Foto Profil</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20">
                  Hapus Foto Profil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </motion.div>
        </div>
        {isMine && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Link to="/account-settings">
              <motion.div {...buttonHoverTap}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow hover:bg-white dark:hover:bg-gray-700"
                >
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </motion.div>
            </Link>
          </div>
        )}
      </motion.div>

      <motion.div
        variants={headerTextVariants}
        className="pt-16 md:pt-12 pl-4 md:pl-10 pr-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {user?.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          @{user?.username}
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300 mt-3 max-w-xl">
          {user?.bio || "Belum ada bio."}
        </p>
      </motion.div>

      <motion.section
        variants={sectionContainerStagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2">
          {" "}
          <PersonalInfoCard userData={user} />
        </div>

        <div className="flex flex-col gap-8">
          <AddressCard user={user} />

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 p-6 rounded-xl shadow-md border border-emerald-200 dark:border-emerald-800"
          >
            <h3 className="font-semibold text-lg mb-3 text-emerald-800 dark:text-emerald-200">
              Ringkasan Kesejahteraan
            </h3>
            <div className="space-y-3 text-sm text-emerald-700 dark:text-emerald-300">
              <p>✨ Mood Rata-Rata: Positif</p>
              <p>🎯 Tujuan Tercapai Minggu Ini: 3/5</p>
              <p>🧘 Sesi Mindfulness: 4 Sesi</p>
              <Link
                to="/journal"
                className="text-teal-600 dark:text-teal-400 hover:underline font-medium block mt-3"
              >
                Lihat Jurnal Lengkap →
              </Link>
            </div>
          </motion.div> */}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ProfileView;
