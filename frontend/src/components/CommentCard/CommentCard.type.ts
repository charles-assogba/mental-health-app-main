import { ThreadComment } from "@/pages/Community/Community.type";
import { ThreadCommentReply } from "@/pages/CommunityThread/CommunityThread.type";
import { Dispatch, RefObject, SetStateAction } from "react";

export interface PostThreadReplyResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  owner_id: number;
  comment_id: number;
  body: string;
}

export interface CommentCardProps {
  error: string;
  loading: boolean;
  submitReply: () => void;
  data: ThreadComment;
  replies?: ThreadCommentReply[];
  commentsOpen: boolean;
  setCommentsOpen: Dispatch<SetStateAction<boolean>>;
  replyOpen: boolean;
  setReplyOpen: Dispatch<SetStateAction<boolean>>;
  replyInputRef: RefObject<HTMLInputElement | null>;
  loggedIn: boolean;

  handleDelete: (commentId: number | string) => void;
  currentUserId?: number | string | null;
}
