import { ThreadCommentReply } from "@/pages/CommunityThread/CommunityThread.type";
import ReplySectionView from "./ReplySection.view";
import { toast } from "sonner";

import { ReplySectionProps } from "./ReplySection.type";
import { useUser } from "../Header/Header.context";
import { client } from "@/config/axiosClient";
import { FetchThreadContext } from "@/pages/CommunityThread/CommunityThread.context";
import { useContext } from "react";

export default function ReplySection({ data }: { data: ThreadCommentReply }) {
  const fetchThread = useContext(FetchThreadContext);
  const { user } = useUser();
  const currentUserId = user?.id;

  const handleDeleteReply = async (replyId: string | number) => {
    console.log(`Attempting to delete reply ID: ${replyId}`);
    toast(`Simulasi: Menghapus balasan ID: ${replyId}`);
    try {
      await client().delete(`/thread-comment-reply/${replyId}`);
      toast.success("Balasan berhasil dihapus.");
      fetchThread();
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("Gagal menghapus balasan.");
    }
  };

  const viewProps: ReplySectionProps = {
    data,
    handleDelete: handleDeleteReply,
    currentUserId: currentUserId,
  };

  return <ReplySectionView {...viewProps} />;
}
