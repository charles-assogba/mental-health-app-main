import { useContext, useEffect, useRef, useState } from "react";
import CommentCardView from "./CommentCard.view";
import { ThreadComment } from "@/pages/Community/Community.type";
import { ThreadCommentReply } from "@/pages/CommunityThread/CommunityThread.type";
import { toast } from "sonner";
import { FetchThreadContext } from "@/pages/CommunityThread/CommunityThread.context";
import { useUser } from "../Header/Header.context";
import { User } from "../Header/Header.type";

export default function CommentCard({
  replies,
  data,
}: {
  replies?: ThreadCommentReply[];
  data: ThreadComment;
  loggedIn: User | null;
}) {
  const replyInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const fetchThread = useContext(FetchThreadContext);

  const { user } = useUser();
  const currentUserId = user?.id;

  const submitReply = async () => {
    setLoading(true);
    setError("");
    if (!replyInputRef.current?.value.trim()) {
      setError("Balasan tidak boleh kosong.");
      setLoading(false);
      return;
    }
    toast("Reply submitted!");
    replyInputRef.current.value = "";
    fetchThread();
    setLoading(false);
    setReplyOpen(false);
  };

  const handleDeleteComment = async (commentId: number | string) => {
    toast(`Simulasi: Menghapus komentar ID: ${commentId}`);
    toast.success("Komentar berhasil dihapus.");
    fetchThread();
  };

  useEffect(() => {
    if (replyOpen) {
      replyInputRef.current?.focus();
      if (!commentsOpen) {
        setCommentsOpen(true);
      }
    }
  }, [replyOpen, commentsOpen]);

  useEffect(() => {
    if (!commentsOpen) {
      setReplyOpen(false);
    }
  }, [commentsOpen]);

  return (
    <CommentCardView
      error={error}
      loading={loading}
      submitReply={submitReply}
      data={data}
      replyInputRef={replyInputRef}
      setCommentsOpen={setCommentsOpen}
      commentsOpen={commentsOpen}
      replies={replies}
      replyOpen={replyOpen}
      setReplyOpen={setReplyOpen}
      loggedIn={!!currentUserId}
      handleDelete={handleDeleteComment}
      currentUserId={currentUserId}
    />
  );
}
