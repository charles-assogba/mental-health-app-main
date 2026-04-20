import { FC } from "react";
import { ReplySectionProps } from "./ReplySection.type";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Link } from "react-router-dom";
import { Clock, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { humanize } from "@/utils/humanize";
import { motion } from "framer-motion";

const ReplySectionView: FC<ReplySectionProps> = ({
  data,
  handleDelete,
  currentUserId,
}) => {
  const ownerName = data.owner?.name || "Pengguna Anonim";
  const ownerAvatar = data.owner?.avatar;
  const createdAt = data.created_at;
  const replyBody = data.body || "";

  const isOwner =
    !!currentUserId && !!data.owner && currentUserId === data.owner.id;

  const itemVariant = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 5 },
  };

  return (
    <motion.div
      key={data.id}
      variants={itemVariant}
      layout
      className="flex space-x-3 group relative"
    >
      <Link to={`/profile/${data.owner.id}`} className="flex-shrink-0 pt-0.5">
        <UserAvatar src={ownerAvatar} name={ownerName} size="sm" />
      </Link>

      <div className="flex flex-col space-y-0.5 flex-grow min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 flex-grow min-w-0 pr-1">
            <Link
              to={`/profile/${data.owner.id}`}
              className="text-xs font-semibold text-gray-800 dark:text-gray-100 hover:underline truncate"
              title={ownerName}
            >
              {ownerName}
            </Link>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center flex-shrink-0">
              {createdAt && <Clock className="w-2.5 h-2.5 mr-1" />}
              {createdAt && humanize(createdAt)}
            </span>
          </div>

          {handleDelete && isOwner && (
            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                    className="h-6 w-6 rounded-full text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    aria-label="Opsi balasan"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      handleDelete(data.id);
                    }}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Balasan</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">
          {replyBody}
        </p>
      </div>
    </motion.div>
  );
};

export default ReplySectionView;
