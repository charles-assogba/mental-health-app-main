import { FC, RefObject } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadableButton from "../LoadableButton/LoadableButton";
import ReplySection from "../ReplySection/ReplySection";
import UserAvatar from "../UserAvatar/UserAvatar";
import { motion, AnimatePresence } from "framer-motion";
import {
  CornerDownRight,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  Clock,
  MoreVertical,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommentCardProps } from "./CommentCard.type";
import {
  sectionRevealVariants,
  repliesListVariants,
  replyItemVariants,
} from "./CommentCard.data";
import { Link } from "react-router-dom";
import { humanize } from "@/utils/humanize";

const CommentCardView: FC<CommentCardProps> = ({
  error,
  loading,
  submitReply,
  data,
  replies,
  commentsOpen,
  setCommentsOpen,
  replyOpen,
  setReplyOpen,
  replyInputRef,
  loggedIn,
  handleDelete,
  currentUserId,
}) => {
  const ownerName = data.owner?.name || "Pengguna Anonim";

  const commentBody = data.body || "";
  const createdAt = data.created_at || "";

  const isOwner = !!currentUserId && currentUserId === data.owner.id;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex space-x-3 py-4 border-b border-gray-100 dark:border-slate-700/50 group"
    >
      <Link to={`/profile/${data.owner.id}`} className="flex-shrink-0 pt-1">
        <UserAvatar name={ownerName} size="sm" />{" "}
      </Link>

      <div className="flex flex-col w-full min-w-0 relative">
        {loggedIn && isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1 right-1 h-7 w-7 rounded-full text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700/50 z-10"
                aria-label="Opsi komentar"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  handleDelete(data.id);
                }}
                className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Komentar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="flex flex-col">
          <div className="flex items-center space-x-2 pr-8">
            {" "}
            <Link
              to={`/profile/${data.owner.id}`}
              className="font-semibold tracking-tight text-sm text-gray-800 dark:text-gray-100 hover:underline"
            >
              {ownerName}
            </Link>
            {createdAt && (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center flex-shrink-0">
                {" "}
                <Clock className="w-3 h-3 mr-1" />
                {humanize(createdAt)}
              </span>
            )}
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed break-words">
            {commentBody}
          </div>
        </div>

        <section className="flex items-center space-x-4 pt-2 text-xs">
          {replies && replies.length > 0 && (
            <button
              onClick={() => setCommentsOpen(!commentsOpen)}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer"
              aria-expanded={commentsOpen}
            >
              {commentsOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
              <span>
                {commentsOpen ? "Sembunyikan" : `${replies.length} Balasan`}
              </span>
            </button>
          )}

          {loggedIn && (
            <button
              onClick={() => setReplyOpen(!replyOpen)}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer"
              aria-controls={`reply-form-${data.id}`}
              aria-expanded={replyOpen}
            >
              <CornerDownRight className="w-3.5 h-3.5" />
              <span>Balas</span>
            </button>
          )}
        </section>

        <AnimatePresence initial={false}>
          {replyOpen && loggedIn && (
            <motion.div
              key={`reply-form-${data.id}`}
              id={`reply-form-${data.id}`}
              variants={sectionRevealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pl-0 pr-3 pt-3"
            >
              <div className="flex flex-col px-6 space-y-3">
                <Input
                  ref={replyInputRef as RefObject<HTMLInputElement>}
                  placeholder={`Balas ke ${ownerName}...`}
                  className="text-sm bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                />
                {error && <p className="text-red-500 text-xs px-1">{error}</p>}
                <div className="flex space-x-2 self-end">
                  <Button
                    onClick={() => setReplyOpen(false)}
                    className="cursor-pointer text-gray-600 dark:text-gray-300 px-3 h-8 text-xs"
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-3.5 h-3.5 mr-1" /> Batal
                  </Button>

                  <motion.div whileTap={{ scale: 0.95 }}>
                    <LoadableButton
                      isLoading={loading}
                      onClick={submitReply}
                      className="cursor-pointer bg-teal-600 hover:bg-teal-500 text-white rounded-md px-3 h-8 text-xs shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" /> Kirim
                    </LoadableButton>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {replies && replies.length > 0 && commentsOpen && (
            <motion.section
              key={`replies-list-${data.id}`}
              variants={sectionRevealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pl-5 mt-3 border-l-2 border-teal-100 dark:border-teal-900/50"
            >
              <motion.div
                className="flex flex-col space-y-4"
                variants={repliesListVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {replies.map((item) => (
                  <motion.div key={item.id} variants={replyItemVariants}>
                    <ReplySection data={item} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CommentCardView;
