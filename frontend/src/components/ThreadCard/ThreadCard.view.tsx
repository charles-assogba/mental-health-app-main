import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MessageSquare, Clock, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import { motion } from "framer-motion";
import { ThreadCardProps } from "./ThreadCard.type";
import { humanize } from "@/utils/humanize";
import { cn } from "@/lib/utils";

const ThreadCardView: FC<ThreadCardProps> = ({
  isFull,
  data,
  handleDelete,
  currentUserId,
}) => {
  const WrapperComponent = isFull ? motion.div : motion(Link);
  const linkProps = isFull ? {} : { to: `/community/${data.id}` };
  const authorName = data.owner?.name || "Pengguna Anonim";
  const authorAvatar = data.owner?.avatar;
  const threadTitle = data.title || "Tanpa Judul";
  const threadBody = data.body || "";
  const commentCount = data.thread_comments?.length || 0;
  const createdAt = data.created_at || "";

  const isOwner =
    !!currentUserId && !!data.owner && currentUserId === data.owner.id;

  return (
    <Card className="py-0 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl overflow-hidden border border-teal-100 dark:border-teal-900 group relative">
      {" "}
      {handleDelete && isOwner && !isFull && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700/50"
              aria-label="Opsi Thread"
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
              <span>Hapus Thread</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <CardHeader className="flex flex-row items-center space-x-4 p-4 pb-2 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 dark:from-teal-900/30 dark:to-cyan-900/30 border-b border-teal-100 dark:border-teal-800">
        <Link
          to={`/profile/${data.owner.id}`}
          onClick={(e) => {
            if (isFull) e.preventDefault();
          }}
          className={cn(
            !isFull ? "cursor-pointer" : "cursor-default",
            "flex-shrink-0"
          )}
          aria-label={`Lihat profil ${authorName}`}
        >
          <UserAvatar src={authorAvatar} name={authorName} size="sm" />{" "}
        </Link>

        <div className="flex flex-col flex-grow min-w-0">
          {" "}
          <Link
            to={`/profile/${data.owner.id}`}
            onClick={(e) => {
              if (isFull) e.preventDefault();
            }}
            className={cn(
              "text-sm font-medium text-teal-700 dark:text-teal-300 hover:underline truncate",
              !isFull ? "cursor-pointer" : "cursor-default"
            )}
            title={authorName}
          >
            {authorName}
          </Link>
          {createdAt && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
              <Clock className="w-3 h-3 mr-1" />
              {humanize(createdAt)}
            </span>
          )}
        </div>
      </CardHeader>
      <WrapperComponent {...linkProps}>
        <CardContent className={`${isFull ? "px-6 py-5" : "px-6 py-4"}`}>
          {" "}
          <CardTitle
            className={cn(
              "text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 leading-tight",
              isFull ? "mb-4" : "mb-2",
              !isFull
                ? "hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-150"
                : ""
            )}
          >
            {threadTitle}
          </CardTitle>
          <div
            className={cn(
              "text-gray-600 dark:text-gray-300 text-sm leading-relaxed prose dark:prose-invert max-w-none",
              !isFull ? "line-clamp-3" : ""
            )}
            dangerouslySetInnerHTML={{ __html: threadBody }}
          />
        </CardContent>
        {!isFull && (
          <CardFooter className="py-3 bg-gray-50 dark:bg-slate-800/50 px-6 border-t border-teal-100 dark:border-teal-800">
            <div className="flex items-center space-x-4 text-xs text-teal-600 dark:text-teal-400">
              <div className="flex items-center space-x-1 hover:text-teal-800 dark:hover:text-teal-200 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>{commentCount} Komentar</span>
              </div>
            </div>
          </CardFooter>
        )}
      </WrapperComponent>
    </Card>
  );
};

export default ThreadCardView;
