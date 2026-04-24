import { ThreadCommentReply } from "@/pages/CommunityThread/CommunityThread.type";
import ReplySectionView from "./ReplySection.view";
import { toast } from "sonner";

import { ReplySectionProps } from "./ReplySection.type";
import { useUser } from "../Header/Header.context";
import { FetchThreadContext } from "@/pages/CommunityThread/CommunityThread.context";
import { useContext } from "react";

export default function ReplySection({ data }: { data: ThreadCommentReply }) {
  const fetchThread = useContext(FetchThreadContext);
  const { user } = useUser();
  const currentUserId = user?.id;

  const handleDeleteReply = async (replyId: string | number) => {
    console.log(`Attempting to delete reply ID: ${replyId}`);
    toast(`Simulasi: Menghapus balasan ID: ${replyId}`);
    toast.success("Balasan berhasil dihapus.");
    fetchThread();
  };

  const viewProps: ReplySectionProps = {
    data,
    handleDelete: handleDeleteReply,
    currentUserId: currentUserId,
  };

  return <ReplySectionView {...viewProps} />;
}
