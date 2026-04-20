import { useContext, useEffect, useRef, useState } from "react";
import CommentCardView from "./CommentCard.view";
import { ThreadComment } from "@/pages/Community/Community.type";
import { ThreadCommentReply } from "@/pages/CommunityThread/CommunityThread.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { PostThreadReplyResponse } from "./CommentCard.type";
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
    try {
      const replyData: PostThreadReplyResponse = (
        await client().post("/thread-comment-reply", {
          comment_id: data.id,
          body: replyInputRef.current?.value,
        })
      ).data;

      toast(replyData.msg);
      replyInputRef.current.value = "";
      fetchThread();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.msg || "Terjadi kesalahan.");
        return;
      }
      console.log(error);
      setError("Terjadi kesalahan tidak terduga saat mengirim balasan.");
    } finally {
      setLoading(false);
      setReplyOpen(false);
    }
  };

  const handleDeleteComment = async (commentId: number | string) => {
    toast(`Simulasi: Menghapus komentar ID: ${commentId}`);

    try {
      await client().delete(`/thread-comment/${commentId}`);
      toast.success("Komentar berhasil dihapus.");
      fetchThread();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Gagal menghapus komentar.");
      setLoading(false);
    }
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
