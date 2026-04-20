import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { FC } from "react";
import { SmThreadProps } from "./SmThreadCard.type";
import { motion } from "framer-motion";
import UserAvatar from "../UserAvatar/UserAvatar";
import { cardVariants } from "./SmThreadCard.data";

const SmThreadCardView: FC<SmThreadProps> = ({ data }) => {
  const threadId = data.id;
  const title = data.title || "Tanpa Judul";
  const authorName = data.owner.name || "Pengguna Anonim";
  const authorAvatar = "avatar";
  const commentCount = data.thread_comments?.length || 0;

  return (
    <motion.div
      layout
      variants={cardVariants}
      className="rounded-lg p-0"
      whileHover="hover"
      whileTap="tap"
    >
      <Link
        to={`/community/${threadId}`}
        className="block p-2.5 rounded-lg transition-colors duration-150 ease-in-out cursor-pointer group"
        aria-label={`Lihat diskusi: ${title}`}
      >
        <div className="flex items-center space-x-3">
          <div className="size-8">
            <UserAvatar src={authorAvatar} name={authorName} size="sm" />{" "}
          </div>

          <div className="flex-grow min-w-0">
            {" "}
            <h4
              className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate"
              title={title}
            >
              {title}
            </h4>
            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              <span className="truncate hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {authorName}
              </span>

              <span className="flex items-center gap-1 flex-shrink-0">
                <MessageCircle className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                <span>{commentCount}</span>
              </span>

              {/* {createdAt && (
                <span className="hidden sm:flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                  <span className="whitespace-nowrap">
                    {formatRelativeTime(createdAt)}
                  </span>
                </span>
              )} */}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SmThreadCardView;
