import { UserCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FC } from "react";
import { cn } from "@/lib/utils";
import {
  cardVariants,
  gridContainerVariants,
  itemVariants,
  labelColor,
  valueColor,
} from "./PersonalInfoCard.data";
import { PersonalInfoCardProps } from "./PersonalInfoCard.type";

const PersonalInfoCardView: FC<PersonalInfoCardProps> = ({ userData }) => {
  const infoItems = [
    { label: "Nama Lengkap", value: userData?.name },
    { label: "Email", value: userData?.email },
    { label: "Nomor Handphone", value: userData?.phone_number },
    {
      label: "Bio Singkat",
      value: userData?.bio,
      colSpan: "sm:col-span-2",
    },
    { label: "Gender", value: userData?.gender },
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Card className="w-full h-full rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-6 pt-5 border-b dark:border-gray-700/70">
          <div className="flex items-center gap-3">
            <UserCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-xl font-semibold">
              Informasi Pribadi
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            variants={gridContainerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
          >
            {infoItems.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className={cn("flex flex-col space-y-1", item.colSpan)}
              >
                <h4
                  className={`text-xs uppercase font-medium tracking-wider ${labelColor}`}
                >
                  {item.label}
                </h4>
                <p className={`text-sm font-medium break-words ${valueColor}`}>
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalInfoCardView;
